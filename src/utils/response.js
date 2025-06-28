export const responseCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  IM_USED: 226,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  Unprocessable_Entity: 422,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  NO_LONGER_AVAILABLE: 410,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  NOT_EXTENDED: 510,
};

export const commonResponseMessage = {
  INTERNAL_SERVER_ERROR: "Oops!! Something went wrong. Please try again.",
  BAD_REQUEST: "Bad Request.",
  INVALID_CREDENTIAL: "Invalid credentials. Please try again.",
  UNAUTHORIZED_ACCESS:
    "Unauthorized access. Please log in with valid credentials.",
  USER_LOGGED_OUT: "User logged out successfully.",
  USER_LOGGED_OUT_FAILED: "Failed to log out user. Please try again later.",
};

export const rolesModuleResponseMessage = {
  ROLE_ADDED_SUCCESSFULLY: "Role added successfully.",
  ROLE_UPDATED_SUCCESSFULLY: "Role updated successfully.",
  ROLE_DELETED_SUCCESSFULLY: "Role deleted successfully.",
  ROLES_FETCHED_SUCCESSFULLY: "Roles fetched successfully.",
  ROLE_NAME_ALREADY_EXISTS:
    "Role name already exists. Please choose a different name.",
  ROLE_NOT_FOUND: "Role not found.",

  ROLE_ADDED_FAILED: "Failed to add role. Please try again later.",
  ROLE_UPDATE_FAILED: "Failed to update role. Please try again later.",
  ROLE_DELETE_FAILED: "Failed to delete role. Please try again later.",
  ROLE_INACTIVE: "User role is inactive. Access is not allowed.",
};

export const otpModuleResponseMessage = {
  // Success messages
  OTP_SENT_EMAIL_SUCCESSFULLY: "OTP sent successfully to your email.",
  OTP_SENT_SMS_SUCCESSFULLY: "OTP sent successfully via SMS.",
  OTP_SENT_WHATSAPP_SUCCESSFULLY: "OTP sent successfully via WhatsApp.",

  // Failure messages
  OTP_SEND_EMAIL_FAILED: "Failed to send OTP to email. Please try again later.",
  OTP_SEND_SMS_FAILED: "Failed to send OTP via SMS. Please try again later.",
  OTP_SEND_WHATSAPP_FAILED:
    "Failed to send OTP via WhatsApp. Please try again later.",

  // Common OTP flow
  OTP_VERIFIED_SUCCESSFULLY: "OTP verified successfully.",
  OTP_VERIFICATION_FAILED:
    "OTP verification failed. Please check and try again.",
  OTP_EXPIRED: "OTP has expired. Please request a new one.",
  OTP_INVALID: "Invalid OTP. Please try again.",
  OTP_ALREADY_USED: "This OTP has already been used.",
};

export const usersModuleResponseMessage = {
  USER_ADDED_SUCCESSFULLY: "User added successfully.",
  USER_UPDATED_SUCCESSFULLY: "User updated successfully.",
  USER_DELETED_SUCCESSFULLY: "User deleted successfully.",
  USERS_FETCHED_SUCCESSFULLY: "Users fetched successfully.",
  USER_FETCHED_SUCCESSFULLY: "User fetched successfully.",

  USERNAME_ALREADY_EXISTS:
    "Username already exists. Please choose a different one.",
  EMAIL_ALREADY_EXISTS: "Email already exists. Please use a different email.",
  PHONE_ALREADY_EXISTS:
    "Phone number already exists. Please use a different number.",
  USER_NOT_FOUND: "User not found.",
  ACCOUNT_DISABLED: "User account is disabled. Please contact support.",
  USER_ADD_FAILED: "Failed to add user. Please try again later.",
  USER_UPDATE_FAILED: "Failed to update user. Please try again later.",
  USER_DELETE_FAILED: "Failed to delete user. Please try again later.",
  USER_FETCH_FAILED: "Failed to fetch user. Please try again later.",
};
