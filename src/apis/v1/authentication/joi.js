import Joi from "joi";
import { DEVICE_TYPES_ENUM } from "../../../utils/constant.variable.js";
import { JoiObjectIdExtension } from "../../../utils/common.joi.js";

export const loginValidation = {
  body: Joi.object({
    identifier: Joi.string().required().messages({
      "string.empty": "Please provide email, phone number, or username.",
      "any.required":
        "At least one of the following is required: Email, phone number, or username.",
    }),
    password: Joi.string().max(50).required().messages({
      "string.empty": "Please enter your password.",
      "any.required": "Password is required.",
      "string.max": "Invalid credentials",
    }),
    deviceType: Joi.string()
      .valid(...Object.values(DEVICE_TYPES_ENUM))
      .optional()
      .messages({
        "any.only": `Device type must be either ${Object.values(
          DEVICE_TYPES_ENUM
        ).join(", ")}.`,
      }),
    fcmToken: Joi.string().when("deviceType", {
      is: Joi.string().valid(DEVICE_TYPES_ENUM.IOS, DEVICE_TYPES_ENUM.ANDROID),
      then: Joi.string(),
      otherwise: Joi.string().allow(""),
    }),
  }),
};
