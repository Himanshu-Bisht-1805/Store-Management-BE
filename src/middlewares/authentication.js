import { getAuthenticationDetails } from "../apis/v1/authentication/query.js";
import { getRoleDetails } from "../apis/v1/roles/query.js";
import { getUserDetails } from "../apis/v1/users/query.js";
import { asyncHandler } from "../utils/common.async.fn.js";
import { STATUS_TYPES } from "../utils/constant.variable.js";
import { verifyToken } from "../utils/jwt.js";
import {
  commonResponseMessage,
  responseCode,
  rolesModuleResponseMessage,
  usersModuleResponseMessage,
} from "../utils/response.js";
import { sendBadRequestResponse, sendResponse } from "../utils/response.fn.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.token;
  if (!authToken)
    return sendResponse(
      res,
      responseCode.UNAUTHORIZED,
      commonResponseMessage.UNAUTHORIZED_ACCESS
    );
  let payload = await verifyToken(authToken);
  if (payload) {
    const userId = payload.payload.userId;
    let user = await getUserDetails({
      _id: userId,
      status: STATUS_TYPES.ACTIVE,
      isDeleted: false,
    });

    if (!user) {
      return sendResponse(
        res,
        responseCode.UNAUTHORIZED,
        commonResponseMessage.UNAUTHORIZED_ACCESS
      );
    }

    if (user.status === STATUS_TYPES.INACTIVE) {
      return sendBadRequestResponse(
        res,
        usersModuleResponseMessage.ACCOUNT_DISABLED
      );
    }
    const roleDetails = await getRoleDetails({ _id: user.roleId });

    if (!roleDetails) {
      return sendBadRequestResponse(
        res,
        usersModuleResponseMessage.ACCOUNT_DISABLED
      );
    }

    if (roleDetails.status === STATUS_TYPES.INACTIVE) {
      return sendBadRequestResponse(
        res,
        rolesModuleResponseMessage.ROLE_INACTIVE
      );
    }

    const loggedIn = await getAuthenticationDetails({ authToken, userId });
    if (!loggedIn) {
      return sendResponse(
        res,
        responseCode.UNAUTHORIZED,
        commonResponseMessage.UNAUTHORIZED_ACCESS
      );
    }
    req.authUser = user;
    req.roleDetails = roleDetails;
    req.loggedIn = loggedIn;
    next();
  }
});
