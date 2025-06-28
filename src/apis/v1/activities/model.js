import { model, Schema } from "mongoose";

const activitySchema = new Schema(
  {
    activityId: { type: Schema.Types.ObjectId, required: true },
    activityName: { type: String, required: true },
    previousData: { type: Object, required: true },
    updatedData: {
      type: Object,
      required: true,
      enum: Object.values(OTP_FOR_USE),
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

export const ACTIVITIES = model("activities", activitySchema);
