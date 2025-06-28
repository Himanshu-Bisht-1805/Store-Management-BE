import { model, Schema } from "mongoose";
import { OTP_FOR_USE, OTP_SEND_IN } from "../../../utils/constant.variable.js";

const otpSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    otp: { type: String, required: true },
    forUse: { type: String, required: true, enum: Object.values(OTP_FOR_USE) },
    sentOTP: { type: String, required: true, enum: Object.values(OTP_SEND_IN) },
  },
  {
    timestamps: true,
  }
);

export const OTPs = model("opts", otpSchema);
