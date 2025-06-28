import { OTPs } from "./model.js";

export const addOTPInDB = (
  filter,
  toBeUpdate,
  options = {
    upsert: true,
    runValidators: true,
    new: true,
    setDefaultsOnInsert: true,
  }
) => {
  return OTPs.findOneAndUpdate(filter, toBeUpdate, options);
};
