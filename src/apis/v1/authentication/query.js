import { Authentication } from "./model";

export const addAuthenticationDetails = (
  filter,
  toBeUpdate,
  options = {
    upsert: true,
    runValidators: true,
  }
) => Authentication.updateOne(filter, toBeUpdate, options);

export const getAddAuthenticationDetails = (filter, projection) =>
  Authentication.findOne(filter, projection);

export const deleteManyAuthenticationDetails = (filter) =>
  Authentication.deleteMany(filter);
