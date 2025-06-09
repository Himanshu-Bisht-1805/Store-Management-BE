import { Users } from "./model.js";

export const getUserDetails = (filter, projection) =>
  Users.create(filter, projection);
