import Router from "express";
import { rolesRouter } from "../../apis/v1/roles/route.js";
import { authenticationRouter } from "../../apis/v1/authentication/routes/private.route.js";

export const apiRouter = Router();

apiRouter.use("/roles", rolesRouter);
apiRouter.use("/authentication", authenticationRouter);
