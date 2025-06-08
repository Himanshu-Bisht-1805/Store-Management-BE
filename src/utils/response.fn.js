export const sendResponse = (
  res,
  code,
  message,
  data = {},
  success = false
) => {
  res
    ?.status(code)
    .send({ code, message: res.showMessage ? message : "", data, success });
};

export const sendOkResponse = (
  res,
  message = 'Your request has been processed successfully."',
  data = {}
) => {
  res?.status(200).send({
    code: 200,
    message: res.showMessage ? message : "",
    success: true,
    data,
  });
};

export const sendConflictResponse = (
  res,
  message = "A conflict occurred. Please ensure there are no duplicates and try again.",
  data = {}
) => {
  res?.status(409).send({
    code: 409,
    message: res.showMessage ? message : "",
    success: false,
    data,
  });
};

export const sendCreatedResponse = (
  res,
  message = "Your request was successful, and the resource has been created.",
  data
) => {
  res?.status(201).send({
    code: 201,
    message: res.showMessage ? message : "",
    success: true,
    data,
  });
};

export const sendUnauthorizedResponse = (
  res,
  message = "User is not authorized to access this resource."
) => {
  res?.status(401).send({
    code: 401,
    message: res.showMessage ? message : "",
    success: false,
    data: null,
  });
};

export const sendNotFoundResponse = (
  res,
  message = "The requested resource could not be found."
) => {
  res?.status(404).send({
    code: 404,
    message: res.showMessage ? message : "",
    success: false,
    data: {},
  });
};

export const sendBadRequestResponse = (
  res,
  message = "Oops! It seems there was a problem with your request. Please review the information and try again."
) => {
  res?.status(400).send({ code: 400, message, data: {}, success: false });
};

export const sendNoContentResponse = (res) => {
  res?.status(204).send({ code: 204, success: true });
};

export const sendInternalServerErrorResponse = (res) =>
  res?.status(500).send({
    code: 500,
    message: "Oops! Something went wrong! Please try again.",
    data: {},
  });
