import { Router } from "express";
import { performAddNewRole } from "./controller.js";
import { validateJoi } from "../../../utils/validate.js";
import { addRoleValidation } from "./joi.js";

export const rolesRouter = Router();

rolesRouter.route("/").post(validateJoi(addRoleValidation), performAddNewRole);
