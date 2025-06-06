import { model, Schema } from "mongoose";
import { STATUS_TYPES } from "../../../utils/constant.variable.js";

const rolesSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    alias: { type: String, trim: true, required: true },
    status: {
      type: String,
      default: STATUS_TYPES.ACTIVE,
      enum: Object.values(STATUS_TYPES),
    },
    description: { type: String, trim: true },
    permissions: {
      users: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
      roles: {
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
      },
    },
    createdBy: { type: Schema.Types.ObjectId },
    updatedBy: { type: Schema.Types.ObjectId },
    deletedBy: { type: Schema.Types.ObjectId },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

rolesSchema.index({ status: 1 });
rolesSchema.index({ name: 1 });
rolesSchema.index({ createdAt: -1 });

export const Roles = model("roles", rolesSchema);
