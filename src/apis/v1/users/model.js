import { Schema, model } from "mongoose";
import {
  STATUS_TYPES,
  GENDER_TYPES,
} from "../../../utils/constant.variable.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER_TYPES),
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(STATUS_TYPES),
      default: STATUS_TYPES.ACTIVE,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    roleId: { type: Schema.Types.ObjectId, required: true, ref: "roles" },
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "users" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "users" },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Partial unique indexes for soft delete users
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

userSchema.index(
  { phoneNumber: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

userSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

// Regular indexes for common queries and sorting
userSchema.index({ createdAt: -1 }); // Sort by recent users
userSchema.index({ status: 1, roleId: 1 }); // Filter by status + roleId
userSchema.index({ isDeleted: 1 }); // Soft delete filter + status

// Text index for searching across name, username, email
userSchema.index({
  name: "text",
  username: "text",
  email: "text",
});

export const Users = model("users", userSchema);
