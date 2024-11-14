import * as yup from "yup";

export const loginValidator = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .typeError("Email must be a valid string")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .typeError("Password must be a valid string")
    .required("Password is required"),
});
