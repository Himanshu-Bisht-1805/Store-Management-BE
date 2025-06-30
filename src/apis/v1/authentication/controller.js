import { envVariables } from "../../../config/env.validate.js";
import { asyncHandler } from "../../../utils/common.async.fn.js";
import { generateOTP } from "../../../utils/common.fn.js";
import {
  DEVICE_TYPES_ENUM,
  OTP_FOR_USE,
  STATUS_TYPES,
} from "../../../utils/constant.variable.js";
import { verifyPassword } from "../../../utils/hashing.js";
import { generateAuthToken } from "../../../utils/jwt.js";
import {
  sendBadRequestResponse,
  sendNotFoundResponse,
  sendOkResponse,
} from "../../../utils/response.fn.js";
import {
  commonResponseMessage,
  rolesModuleResponseMessage,
  usersModuleResponseMessage,
} from "../../../utils/response.js";
import { addOTPInDB } from "../otps/query.js";
import { getRoleDetails } from "../roles/query.js";
import { getUserDetails, updateUserDetails } from "../users/query.js";
import {
  addAuthenticationDetails,
  deleteManyAuthenticationDetails,
} from "./query.js";

export const performLogin = asyncHandler(async (req, res) => {
  let { identifier, password, deviceType, fcmToken } = req.body;

  const userDetails = await getUserDetails({
    $or: [
      { email: identifier },
      { username: identifier },
      { phoneNumber: identifier },
    ],
  });

  if (!userDetails)
    return sendNotFoundResponse(res, usersModuleResponseMessage.USER_NOT_FOUND);
  const {
    status,
    isDeleted,
    _id: userId,
    username,
    name,
    photo,
    phoneNumberVerified,
    whatsappVerified,
    emailVerified,
    fatherName,
    dob,
    gender,
    phoneNumber,
    email,
    roleId,
    createdAt,
  } = userDetails;

  if (isDeleted) {
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.USER_NOT_FOUND
    );
  }

  if (status === STATUS_TYPES.INACTIVE) {
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.ACCOUNT_DISABLED
    );
  }

  const roleDetails = await getRoleDetails(
    { _id: roleId },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      alias: 0,
    }
  );

  if (!roleDetails) {
    return sendNotFoundResponse(res, rolesModuleResponseMessage.ROLE_NOT_FOUND);
  }

  if (roleDetails.status === STATUS_TYPES.INACTIVE) {
    return sendBadRequestResponse(
      res,
      rolesModuleResponseMessage.ROLE_INACTIVE
    );
  }

  const hashedPassword = userDetails.password;

  const verified = await verifyPassword(password, hashedPassword);

  if (!verified) {
    return sendBadRequestResponse(
      res,
      commonResponseMessage.INVALID_CREDENTIAL
    );
  }

  const authToken = await generateAuthToken(
    { userId },
    envVariables.AUTH_TOKEN_EXPIRE_TIME
  );

  let data = {
    loggedInWay: identifier.trim().toLowerCase(),
    userId,
    authToken,
    deviceType,
  };

  if (
    (deviceType === DEVICE_TYPES_ENUM.ANDROID && fcmToken) ||
    (deviceType === DEVICE_TYPES_ENUM.IOS && fcmToken)
  ) {
    data.fcmToken = fcmToken;
  }

  await addAuthenticationDetails({ userId }, data);

  if (!emailVerified) {
    const result = await updateUserDetails(
      { _id: userId, isDeleted: false },
      { emailVerified: true }
    );
    console.log("Update result:", result);
  }

  return sendOkResponse(res, `Welcome back! ${name}`, {
    authToken,
    user: {
      _id: userId,
      username,
      name,
      photo,
      phoneNumberVerified,
      whatsappVerified,
      emailVerified,
      fatherName,
      dob,
      gender,
      phoneNumber,
      email,
      status,
      roleDetails,
      createdAt,
    },
  });
});

export const performLogOut = asyncHandler(async (req, res) => {
  const { _id: userId } = req.authUser;

  return sendOkResponse(res, "0", { data: req.authUser });

  const loggedOut = await deleteManyAuthenticationDetails({
    userId,
  });

  if (!loggedOut) {
    return sendBadRequestResponse(
      res,
      commonResponseMessage.USER_LOGGED_OUT_FAILED
    );
  }
  return sendOkResponse(res, commonResponseMessage.USER_LOGGED_OUT);
});

export const performGetOtpForForgotPassword = asyncHandler(async (req, res) => {
  let { identifier, sentOTP } = req.body;

  const userDetails = await getUserDetails({
    $or: [
      { email: identifier },
      { username: identifier },
      { phoneNumber: identifier },
    ],
  });

  if (!userDetails)
    return sendNotFoundResponse(res, usersModuleResponseMessage.USER_NOT_FOUND);
  const {
    status,
    isDeleted,
    _id: userId,
    roleId,
    phoneNumber,
    email,
    phoneNumberVerified,
    whatsappVerified,
  } = userDetails;

  if (isDeleted) {
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.USER_NOT_FOUND
    );
  }

  if (status === STATUS_TYPES.INACTIVE) {
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.ACCOUNT_DISABLED
    );
  }

  const roleDetails = await getRoleDetails({ _id: roleId });

  if (!roleDetails) {
    return sendNotFoundResponse(res, rolesModuleResponseMessage.ROLE_NOT_FOUND);
  }

  if (roleDetails.status === STATUS_TYPES.INACTIVE) {
    return sendBadRequestResponse(
      res,
      rolesModuleResponseMessage.ROLE_INACTIVE
    );
  }

  const otp = generateOTP();
  const forUse = OTP_FOR_USE.FORGOT_PASSWORD;

  const added = await addOTPInDB(
    { userId, forUse },
    {
      userId,
      otp,
      forUse,
      sentOTP,
    }
  );

  const message = {
    "in Email": `OTP sent successfully to ${email}.`,
    "in Whatsapp": `OTP sent successfully via WhatsApp your ${phoneNumber}.`,
    "in SMS": `OTP sent successfully via SMS ${phoneNumber}.`,
  };

  if (!added) {
    return sendBadRequestResponse(res);
  }

  return sendOkResponse(res, message[sentOTP]);
});
