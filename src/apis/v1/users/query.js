import { Users } from "./model.js";

export const addUserDetails = (data) => Users.create(data);

export const getUserDetails = (filter, projection) =>
  Users.findOne(filter, projection);

export const updateUserDetails = (filter, toBeUpdate, options) =>
  Users.findOneAndUpdate(filter, toBeUpdate, options);
