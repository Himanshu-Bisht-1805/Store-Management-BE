import { Authentication } from "./model.js";

export const addAuthenticationDetails = (
  filter,
  toBeUpdate,
  options = {
    upsert: true,
    runValidators: true,
  }
) => Authentication.updateOne(filter, toBeUpdate, options);

export const getAuthenticationDetails = (filter, projection) =>
  Authentication.findOne(filter, projection);

export const deleteManyAuthenticationDetails = (filter) =>
  Authentication.deleteMany(filter);
