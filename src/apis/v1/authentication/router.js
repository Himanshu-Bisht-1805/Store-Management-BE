import Router from "express";
import { performLogin } from "./controller.js";

export const authenticationRouter = Router();

authenticationRouter.route("/").post(performLogin);
