import { asyncHandler } from "../../../utils/common.async.fn";
import {
  rolesModuleResponseMessage,
  usersModuleResponseMessage,
} from "../../../utils/response";
import {
  sendBadRequestResponse,
  sendConflictResponse,
  sendNotFoundResponse,
  sendOkResponse,
} from "../../../utils/response.fn";
import { getRoleDetails } from "../roles/query";
import { validateEmailAndPhoneNumber } from "./helper";
import { addUserDetails } from "./query";

export const performAddUser = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    fatherName,
    dob,
    gender,
    phoneNumber,
    email,
    roleId,
  } = req.body;
  const createdBy = req.authUser._id;

  const result = await validateEmailAndPhoneNumber({
    phoneNumber,
    email,
    username,
  });

  if (result) {
    return sendConflictResponse(res, "");
  }

  const roleDetails = await getRoleDetails({ _id: roleId });

  if (!roleDetails) {
    return sendNotFoundResponse(res, rolesModuleResponseMessage.ROLE_NOT_FOUND);
  }

  const added = await addUserDetails({ ...req.body, createdBy });

  if (!added)
    return sendBadRequestResponse(
      res,
      usersModuleResponseMessage.USER_ADD_FAILED
    );

  return sendOkResponse(
    res,
    usersModuleResponseMessage.USER_ADDED_SUCCESSFULLY
  );
});
