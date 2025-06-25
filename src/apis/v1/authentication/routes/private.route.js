import Router from "express";
import { performLogOut } from "../controller.js";

export const authenticationRouter = Router();

authenticationRouter.route("/logout").put(performLogOut);
