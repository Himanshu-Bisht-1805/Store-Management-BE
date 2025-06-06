import dotenv from "dotenv";
import Joi from "joi";

// Load env variables from .env file
dotenv.config();

// Define validation schema using Joi
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development")
    .required(),
  PORT: Joi.number().default(5000).required(),
  MONGO_URI: Joi.string().required().label("MONGO_URI").required(),
}).unknown();

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
};
