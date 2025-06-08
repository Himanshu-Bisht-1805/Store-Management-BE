import {
  responseCode,
  rolesModuleResponseMessage,
} from "../../../utils/response.js";
import { getRoleDetails } from "./query.js";

export const checkNameAlreadyExists = async (name) => {
  const roleDetails = await getRoleDetails({ name });

  if (!roleDetails) {
    return { success: true };
  }

  return {
    success: false,
    statusCode: responseCode.CONFLICT,
    message: rolesModuleResponseMessage.ROLE_NAME_ALREADY_EXISTS,
  };
};
