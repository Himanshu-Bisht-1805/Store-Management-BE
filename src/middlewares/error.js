import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/api.error.js";
import { responseMessage, responseCode } from "../config/response.js";

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? responseCode.BAD_REQUEST
        : responseCode.INTERNAL_SERVER_ERROR;
    const message =
      error.message || statusCode === responseCode.BAD_REQUEST
        ? responseMessage.BAD_REQUEST
        : responseMessage.INTERNAL_SERVER_ERROR;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// // eslint-disable-next-line no-unused-vars
// export const errorHandler = (err, req, res, next) => {
//   let { statusCode, message } = err;
//   message = message.replace(/"/g, '');
//   message = message.charAt(0).toUpperCase() + message.slice(1);

//   if (config.env === 'production' && !err.isOperational) {
//     statusCode = responseCode.INTERNAL_SERVER_ERROR;
//     message = responseMessage.INTERNAL_SERVER_ERROR;
//   }

//   res.locals.errorMessage =
//     err.message.replace(/"/g, '').charAt(0).toUpperCase() + message.slice(1);

//   const response = {
//     code: statusCode,
//     message: statusCode === 500 ? 'Oops! something went wrong' : message,
//   };

//   if (config.env === 'development') {
//     logger.error(err);
//   }

//   res.status(statusCode).send(response);
// };
