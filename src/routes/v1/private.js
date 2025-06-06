import Router from "express";
import { rolesRouter } from "../../apis/v1/roles/route.js";

export const v1APIRouter = Router();

v1APIRouter.use("/roles", rolesRouter);
