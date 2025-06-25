import Router from "express";
import { authenticationRouter } from "../../apis/v1/authentication/routes/public.route.js";

export const pubRouter = Router();

pubRouter.use("/api", authenticationRouter);
