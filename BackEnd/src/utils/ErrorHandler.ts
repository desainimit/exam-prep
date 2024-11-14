import { MESSAGE, STATUSCODE } from "@constants";
import { CustomError } from "./CustomError";
import { ValidationError } from "yup";
import { JsonWebTokenError } from "jsonwebtoken";

export const ErrorHandler = (error: any) => {
  if (error instanceof CustomError) {
    throw error;
  } else if (error instanceof ValidationError) {
    throw new CustomError(STATUSCODE.BAD_REQUEST, error.errors.join(", "));
  } else if (error instanceof JsonWebTokenError) {
    throw new CustomError(STATUSCODE.UNAUTHORIZED_STATUS, error.message);
  } else if (error instanceof Error) {
    throw new CustomError(STATUSCODE.BAD_REQUEST, error.message);
  } else {
    throw new CustomError(STATUSCODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }
};
