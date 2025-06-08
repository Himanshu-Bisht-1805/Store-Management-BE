import { Roles } from "./model.js";

export const addRoleInDB = (data) => Roles.create(data);

export const getRoleDetails = (filter, projection) =>
  Roles.findOne(filter, projection);
