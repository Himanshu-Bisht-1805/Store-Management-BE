import Router from "express";
import { rolesRouter } from "../../apis/v1/roles/route.js";

export const apiRouter = Router();

apiRouter.use("/v1/roles", rolesRouter);
