import jwt from "jsonwebtoken";
import { envVariables } from "../config/env.validate.js";

export const generateAuthToken = async (payload, expiresIn) => {
  try {
    return jwt.sign({ payload }, envVariables.COUNTER_SIGN, {
      expiresIn: expiresIn || "365d",
    });
  } catch (error) {
    throw new Error("Token generation failed: " + error.message);
  }
};

export const verifyToken = async (authToken) => {
  return jwt.verify(authToken, envVariables.COUNTER_SIGN);
};
