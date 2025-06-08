import dotenv from "dotenv";
import Joi from "joi";
import { GENDER_TYPES } from "../utils/constant.variable.js";

// Load env variables from .env file
dotenv.config();

// Define validation schema using Joi
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development")
    .required(),

  PORT: Joi.number().default(5000).required(),

  MONGO_URI: Joi.string().required().label("MONGO_URI"),

  ADMIN_ROLE_ALIAS: Joi.string().required(),

  SALT_ROUNDS: Joi.number().min(8).max(12).default(10).required(),

  DEFAULT_USER_DOB: Joi.date().required(),
  DEFAULT_USER_NAME: Joi.string().required(),
  DEFAULT_USERNAME: Joi.string().required(),
  DEFAULT_PASSWORD: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@#$&!])[A-Za-z\d.@#$&!]{8,15}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "DEFAULT_PASSWORD must be 8–15 characters long, and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (.@#$&!).",
    }),
  DEFAULT_USER_FATHER_NAME: Joi.string().required(),
  DEFAULT_USER_GENDER: Joi.string()
    .valid(...Object.values(GENDER_TYPES))
    .required(),
  DEFAULT_USER_PHONE: Joi.string().required(),
  DEFAULT_USER_EMAIL: Joi.string().email().required(),
}).unknown(); // Allow other vars not explicitly validated

// Validate process.env
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Environment variable validation error: ${error.message}`);
}

// Export validated env variables
export const envVariables = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  ADMIN_ROLE_ALIAS: envVars.ADMIN_ROLE_ALIAS,
  SALT_ROUNDS: envVars.SALT_ROUNDS,
  DEFAULT_USER_DOB: envVars.DEFAULT_USER_DOB,
  DEFAULT_USER_NAME: envVars.DEFAULT_USER_NAME,
  DEFAULT_USERNAME: envVars.DEFAULT_USERNAME,
  DEFAULT_PASSWORD: envVars.DEFAULT_PASSWORD,
  DEFAULT_USER_FATHER_NAME: envVars.DEFAULT_USER_FATHER_NAME,
  DEFAULT_USER_GENDER: envVars.DEFAULT_USER_GENDER,
  DEFAULT_USER_PHONE: envVars.DEFAULT_USER_PHONE,
  DEFAULT_USER_EMAIL: envVars.DEFAULT_USER_EMAIL,
};
