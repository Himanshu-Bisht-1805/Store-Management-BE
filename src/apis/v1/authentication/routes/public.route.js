import Router from "express";
import { validateJoi } from "../../../../utils/validate.js";
import { loginValidation } from "../joi.js";
import { performGetOtpForForgotPassword, performLogin } from "../controller.js";

export const authenticationRouter = Router();

authenticationRouter
  .route("/login")
  .post(validateJoi(loginValidation), performLogin);

authenticationRouter
  .route("/otp-forgot-password")
  .get(performGetOtpForForgotPassword);
