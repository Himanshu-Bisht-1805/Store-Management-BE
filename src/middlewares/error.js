import mongoose from "mongoose";
import { ApiError } from "../utils/api.error.js";
import { commonResponseMessage, responseCode } from "../utils/response.js";
import { envVariables } from "../config/env.validate.js";
import { logger } from "../config/logger.js";

// Convert any thrown error to ApiError format
export const errorConverter = (err, req, res, next) => {
  let error = err;

  const isMongooseError = error instanceof mongoose.Error;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (isMongooseError
        ? responseCode.BAD_REQUEST
        : responseCode.INTERNAL_SERVER_ERROR);
    const message =
      error.message ||
      (isMongooseError
        ? commonResponseMessage.BAD_REQUEST
        : commonResponseMessage.INTERNAL_SERVER_ERROR);
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

// Final error handler middleware
export const errorHandler = (err, req, res, next) => {
  let {
    statusCode = responseCode.INTERNAL_SERVER_ERROR,
    message = commonResponseMessage.INTERNAL_SERVER_ERROR,
  } = err;

  if (typeof message === "string") {
    message = message.replace(/"/g, "").trim();
    message = message.charAt(0).toUpperCase() + message.slice(1);
  }

  if (envVariables.NODE_ENV === "production" && !err.isOperational) {
    statusCode = responseCode.INTERNAL_SERVER_ERROR;
    message = commonResponseMessage.INTERNAL_SERVER_ERROR;
  }

  const response = {
    code: statusCode,
    message: statusCode === 500 ? "Oops! Something went wrong." : message,
  };

  // Optional logging
  if (envVariables.NODE_ENV === "development") {
    logger.error(err.stack || err);
  }

  res.status(statusCode).json(response);
};
