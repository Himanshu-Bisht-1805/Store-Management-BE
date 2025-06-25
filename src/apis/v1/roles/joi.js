import Joi from "joi";
// import { ExtendedJoiObjectId } from "../../../utils/common.joi.js";

const permissionSetSchema = Joi.object({
  add: Joi.boolean().default(false),
  edit: Joi.boolean().default(false),
  delete: Joi.boolean().default(false),
  view: Joi.boolean().default(false),
});

export const addRoleValidation = {
  body: Joi.object({
    name: Joi.string().trim().required().messages({
      "any.required": "Role name is required.",
    }),
    description: Joi.string().required(),
    permissions: Joi.object()
      .pattern(
        Joi.string(), // dynamic key like "users", "roles", etc.
        permissionSetSchema
      )
      .required()
      .messages({
        "object.base": "Permissions must be permission sets.",
      }),
  }),
};
