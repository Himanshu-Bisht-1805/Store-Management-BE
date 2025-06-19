import Router from "express";
import { authenticationRouter } from "../../apis/v1/authentication/router.js";

export const pubRouter = Router();

pubRouter.use("/api", authenticationRouter);
