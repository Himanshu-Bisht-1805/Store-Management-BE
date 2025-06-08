import bcrypt from "bcrypt";
import { envVariables } from "../config/env.validate.js";

// Hash password
export const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, envVariables.SALT_ROUNDS);
  return hash;
};

// Verify password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
