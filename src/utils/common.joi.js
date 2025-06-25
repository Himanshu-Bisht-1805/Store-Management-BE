import Joi from "joi";
import JoiObjectId from "joi-objectid";

export const JoiObjectIdExtension = JoiObjectId(Joi);
