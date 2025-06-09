import { model, Schema } from "mongoose";
import { DEVICE_TYPES_ENUM } from "../../../utils/constant.variable.js";

const AuthenticationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    loggedInWay: { type: String, required: true },
    fcmToken: { type: String },
    authToken: { type: String, required: true },
    deviceType: {
      type: String,
      enum: Object.values(DEVICE_TYPES_ENUM),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Authentication = model("authentication", AuthenticationSchema);
