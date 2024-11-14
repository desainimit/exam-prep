import jwt from "jsonwebtoken";
import { CustomError, ErrorHandler } from "@utils";
import { STATUSCODE, MESSAGE } from "@constants";
import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import config from "config";

export class AuthMiddleware extends BaseMiddleware {
  handler(req: Request, res: Response, next: NextFunction): void {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) {
        throw new CustomError(STATUSCODE.NOT_FOUND, MESSAGE.TOKEN_NOT_FOUND);
      }

      const decoded = jwt.verify(
        token,
        config.get("ACCESS_TOKEN_SECRET") as string
      ) as { _id: string };

      req.headers.userId = decoded?._id;
      next();
    } catch (error) {
      next(ErrorHandler(error));
    }
  }
}
