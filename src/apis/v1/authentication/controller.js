import { envVariables } from "../../../config/env.validate.js";
import { asyncHandler } from "../../../utils/common.async.fn.js";
import {
  DEVICE_TYPES_ENUM,
  STATUS_TYPES,
} from "../../../utils/constant.variable.js";
import { verifyPassword } from "../../../utils/hashing.js";
import {
  sendBadRequestResponse,
  sendNotFoundResponse,
} from "../../../utils/response.fn.js";
import { getUserDetails } from "../users/query.js";
import { addAuthenticationDetails } from "./query.js";

export const performLogin = asyncHandler(async (req, res) => {
  let { identifier, password, deviceType, fcmToken } = req.body;

  const userDetails = await getUserDetails({
    $or: [
      { email: identifier },
      { username: identifier },
      { phoneNumber: identifier },
    ],
  });

  if (!userDetails) return sendNotFoundResponse(res, "");
  const { status, isDeleted, _id: userId, username, name, photo } = userDetails;

  if (!isDeleted) {
    return sendBadRequestResponse(res, responseMessage.INVALID_CREDENTIAL);
  }

  const hashedPassword = userDetails.password;

  if (status === STATUS_TYPES.INACTIVE) return sendBadRequestResponse(res, "");

  const verified = await verifyPassword(password, hashedPassword);

  if (!verified) {
    return sendBadRequestResponse(res, "");
  }

  const authToken = generateAuthToken(
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
      role: roleDetails,
      permissions,
      photo,
    },
  });
});
