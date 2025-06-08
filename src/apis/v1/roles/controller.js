import { asyncHandler } from "../../../utils/common.async.fn.js";
import {
  formatDescription,
  formatName,
  generateUniqueString,
} from "../../../utils/common.fn.js";
import {
  sendBadRequestResponse,
  sendOkResponse,
  sendResponse,
} from "../../../utils/response.fn.js";
import { rolesModuleResponseMessage } from "../../../utils/response.js";
import { checkNameAlreadyExists } from "./helper.js";
import { addRoleInDB } from "./query.js";

export const performAddNewRole = asyncHandler(async (req, res) => {
  let { name, description, permissions } = req.body;
  name = formatName(name);
  description = formatDescription(description);
  const createdBy = req.authUser._id;
  const alias = generateUniqueString();
  const { success, statusCode, message } = await checkNameAlreadyExists(name);
  if (!success) {
    return sendResponse(res, statusCode, message);
  }

  const toBeAdded = { name, description, permissions, createdBy, alias };
  const added = await addRoleInDB(toBeAdded);

  if (!added) {
    return sendBadRequestResponse(
      res,
      rolesModuleResponseMessage.ROLE_ADDED_FAILED
    );
  }

  return sendOkResponse(
    res,
    rolesModuleResponseMessage.ROLE_ADDED_SUCCESSFULLY
  );
});

export const performUpdateRoleDetails = asyncHandler(async (req, res) => {});

export const performGetRoleDetails = asyncHandler(async (req, res) => {});

export const performDeleteRoleDetails = asyncHandler(async (req, res) => {});

export const performGetRolesListing = asyncHandler(async (req, res) => {});

export const performGetRoleNameAndId = asyncHandler(async (req, res) => {});

export const performChangeRoleStatus = asyncHandler(async (req, res) => {});
