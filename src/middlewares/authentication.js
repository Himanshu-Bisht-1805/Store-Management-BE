import { getUserDetails } from "../apis/v1/users/query";
import { asyncHandler } from "../utils/common.async.fn";
import { verifyToken } from "../utils/jwt";
import { commonResponseMessage, responseCode } from "../utils/response";

export const authenticate = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.token;
  if (!authToken)
    return sendResponse(
      res,
      responseCode.UNAUTHORIZED,
      commonResponseMessage.UNAUTHORIZED_ACCESS
    );
  try {
    let payload = await verifyToken(authToken);
    if (payload) {
      const userId = payload.payload.userId;
      let user = await getUserDetails({
        _id: ObjectId.createFromHexString(userId),
        status: STATUS_TYPES.ACTIVE,
        isDeleted: false,
      });

      if (!user) {
        return sendResponse(
          res,
          responseCode.UNAUTHORIZED,
          responseMessage.AUTHENTICATION_FAILED
        );
      }

      if (user.roleStatus === STATUS_TYPES.INACTIVE) {
        return sendBadRequestResponse(res, responseMessage.USER_ROLE_INACTIVE);
      }

      if (user.status === STATUS_TYPES.INACTIVE) {
        return sendBadRequestResponse(
          res,
          responseMessage.USER_ACCOUNT_INACTIVE
        );
      }

      const loggedIn = await getAuthenticationDetails({ authToken });
      if (!loggedIn)
        return sendResponse(
          res,
          responseCode.UNAUTHORIZED,
          responseMessage.AUTHENTICATION_FAILED
        );
      req.authUser = user;
      req.loggedIn = loggedIn;
      next();
    }
  } catch (error) {
    return sendResponse(
      res,
      responseCode.UNAUTHORIZED,
      responseMessage.AUTHENTICATION_FAILED
    );
  }
});
