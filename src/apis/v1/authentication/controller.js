import { envVariables } from "../../../config/env.validate.js";
import { asyncHandler } from "../../../utils/common.async.fn.js";
import {
  DEVICE_TYPES_ENUM,
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
import { getRoleDetails } from "../roles/query.js";
import { getUserDetails } from "../users/query.js";
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
  if (status === STATUS_TYPES.INACTIVE)
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.ACCOUNT_DISABLED
    );

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
