import { Users } from "./model.js";

export const addUserDetails = (data) => Users.create(data);

export const getUserDetails = (filter, projection) =>
  Users.findOne(filter, projection);
