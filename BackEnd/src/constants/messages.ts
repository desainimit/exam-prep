const MESSAGE = {
  BAD_REQUEST: "An error occurred",
  INTERNAL_STATUS: "Internal Server Error",
  NOT_FOUND: "Not Found",
  UNAUTHORIZED_STATUS: "Unauthorized",
  FORBIDDEN_STATUS: "Forbidden",
  CONFLICT: "Conflict",
  SUCCESS: "Success",

  MONGODB_ERROR: "MongoDB Error",
  MONGODB_CONNECTED: "MongoDB connected",

  USER_REGISTERED: "User registered successfully",
  FAIL_USER_REGISTER: "Failed to register user",
  USER_NOT_LOGGED_IN: "Please login to continue",
  USER_LOGGED_IN: "User logged in successfully",
  USER_LOGGED_OUT: "User logged out successfully",
  USER_NOT_LOGGED_OUT: "Failed to logout user",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  USER_FETCHED: "User fetched successfully",
  USER_FETCHED_ALL: "Users fetched successfully",
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User already exists",
  USER_EMAIL_USERNAME_ALREADY_EXISTS: "Username or email already exists",

  USER_NOT_VERIFIED: "User not verified",
  USER_DELETED_FAILED: "Failed to delete user",

  USER_PROFILE_SET: "User profile set successfully",
  USER_PROFILE_UPDATED: "User profile updated successfully",
  USER_PROFILE_IMAGE_UPDATED: "User profile image updated successfully",
  USER_PROFILE_IMAGE_DELETED: "User profile image deleted successfully",
  USER_PROFILE_IMAGE_FAILED: "Failed to set profile image",

  USER_PASSWORD_WRONG: "Incorrect password",
  USER_PASSWORD_UPDATED: "User password updated successfully",
  USER_PASSWORD_RESET: "User password reset successfully",

  USER_EMAIL_VERIFIED: "User email verified successfully",
  USER_EMAIL_RESENT: "User email resent successfully",
  USER_EMAIL_CHANGED: "User email changed successfully",
  USER_EMAIL_CHANGED_RESENT: "User email changed resent successfully",
  USER_EMAIL_VERIFICATION_RESENT: "User email verification resent successfully",
  USER_EMAIL_VERIFICATION_FAILED: "User email verification failed",
  USER_EMAIL_VERIFICATION_SUCCESS: "User email verification success",
  USER_EMAIL_VERIFICATION_EXPIRED: "User email verification expired",
  USER_EMAIL_VERIFICATION_RESEND: "User email verification resent",
  USER_EMAIL_SEND: "User email sent successfully",
  USER_EMAIL_NOT_FOUND: "User email not found",
  USER_EMAIL_NOT_CHANGED: "User email not changed",
  USER_EMAIL_NOT_VERIFIED: "User email not verified",
  USER_EMAIL_ALREADY_VERIFIED: "User email already verified",
  USER_EMAIL_SEND_FAILED: "An error occurred while sending email",

  ROLE_NOT_FOUND: "Failed to get role",
  ROLE_CREATED: "Role created successfully",
  ROLE_UPDATED: "Role updated successfully",
  ROLE_DELETED: "Role deleted successfully",
  ROLE_FETCHED: "Role fetched successfully",
  ROLE_FETCHED_ALL: "Roles fetched successfully",

  PERMISSION_CREATED: "Permission created successfully",
  PERMISSION_UPDATED: "Permission updated successfully",
  PERMISSION_DELETED: "Permission deleted successfully",
  PERMISSION_FETCHED: "Permission fetched successfully",
  PERMISSION_NOT_FOUND: "You don't have permission",
  PERMISSION_FETCHED_ALL: "Permissions fetched successfully",

  Role_PERMISSION_CREATED: "Role permission created successfully",
  Role_PERMISSION_UPDATED: "Role permission updated successfully",
  Role_PERMISSION_DELETED: "Role permission deleted successfully",
  Role_PERMISSION_FETCHED: "Role permission fetched successfully",
  Role_PERMISSION_FETCHED_ALL: "Role permissions fetched successfully",

  OTP_SENT: "OTP sent successfully, This otp is valid for 5 minutes",
  OTP_VERIFIED: "OTP verified successfully",
  OTP_RESENT: "OTP resent successfully",
  OTP_INVALID: "Invalid OTP",
  OTP_EXPIRED: "OTP expired",
  OTP_ALREADY_VERIFIED: "OTP already verified",

  TOKEN: "Token generated successfully",
  TOKEN_REFRESH: "Token refreshed successfully",
  TOKEN_INVALID: "Invalid token",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_REVOKED: "Token revoked successfully ",
  TOKEN_NOT_FOUND: "Access denied. No token provided",

  FILE_TYPE_INVALID: "Invalid file type. Only jpeg, jpg, png allowed",
  FILE_SIZE_INVALID: "File size is not more than 1MB",
  FILE_COUNT_INVALID: "You can only upload one file at a time.",
  FILE_UPLOAD_SUCCESS: "File uploaded successfully",
  FILE_UPLOAD_FAILED: "Failed to upload file",
  FILE_DELETED: "File deleted successfully",
  FILE_NOT_FOUND: "File not found",
  FILE_FETCHED: "File fetched successfully",
  FILE_FETCHED_ALL: "Files fetched successfully",
  FILE_NOT_UPLOADED: "Please upload a file",

  FAILED_TO_UPLOAD_IMAGE: "Failed to upload image",
  FAILED_TO_SET_IMAGE: "Failed to set image",
  FAILED_TO_DELETE_IMAGE: "Failed to delete image",

  // Admin Messages
  ADMIN_REGISTERED: "Admin registered successfully",
  ADMIN_NOT_REGISTERED: "Admin not registered",
  ADMIN_NOT_FOUND: "Admin not found",
  ADMIN_ALREADY_EXISTS: "Admin already exists",
  ADMIN_DELETED: "Admin deleted successfully",
  ADMIN_UPDATED: "Admin updated successfully",
  ADMIN_FETCHED: "Admin fetched successfully",
  ADMIN_FETCHED_ALL: "Admins fetched successfully",
  ADMIN_ROLE_NOT_FOUND: "Admin role not found",
  ADMIN_ROLE_UPDATED: "Admin role updated successfully",
  ADMIN_ROLE_DELETED: "Admin role deleted successfully",
  ADMIN_ROLE_FETCHED: "Admin role fetched successfully",
  ADMIN_ROLE_FETCHED_ALL: "Admin roles fetched successfully",
  ADMIN_PERMISSION_NOT_FOUND: "Admin permission not found",
  ADMIN_PERMISSION_UPDATED: "Admin permission updated successfully",
  ADMIN_PERMISSION_DELETED: "Admin permission deleted successfully",
  ADMIN_PERMISSION_FETCHED: "Admin permission fetched successfully",
  ADMIN_PERMISSION_FETCHED_ALL: "Admin permissions fetched successfully",
  ADMIN_ROLE_PERMISSION_CREATED: "Admin role permission created successfully",
  ADMIN_ROLE_PERMISSION_UPDATED: "Admin role permission updated successfully",
  ADMIN_ROLE_PERMISSION_DELETED: "Admin role permission deleted successfully",
  ADMIN_ROLE_PERMISSION_FETCHED: "Admin role permission fetched successfully",
  ADMIN_ROLE_PERMISSION_FETCHED_ALL:
    "Admin role permissions fetched successfully",
  ADMIN_ROLE_PERMISSION_NOT_FOUND: "Admin role permission not found",
  ADMIN_NOT_CREATED: "Admin not created",
};

export { MESSAGE };