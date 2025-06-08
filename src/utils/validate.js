import Joi from "joi";
import { pick } from "./pick.js";
import { ApiError } from "./api.error.js";
import { responseCode } from "./response.js";

export const validateJoi = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "headers"]);
  const requestData = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(requestData);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    const cleanedMessage = errorMessage.replace(/"/g, "");
    return next(new ApiError(responseCode.BAD_REQUEST, cleanedMessage));
  }

  // Apply sanitized values back to the request
  Object.assign(req, value);
  return next();
};
