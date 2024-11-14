import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { CustomError, CustomResponse, ErrorHandler } from "@utils";
import { STATUSCODE, TYPES, MESSAGE } from "@constants";
import { AuthService } from "@services";
import { loginValidator, userValidator } from "@validators";

@controller("/auth")
export class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  @httpPost("/register")
  async register(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response | null> {
    try {
      const userData = req.body;
      await userValidator.validate(userData, { abortEarly: false });
      const newUser = await this.authService.register(userData);
      if (!newUser) {
        throw new CustomError(
          STATUSCODE.BAD_REQUEST,
          MESSAGE.FAIL_USER_REGISTER
        );
      }
      return res
        .status(STATUSCODE.CREATED_STATUS)
        .json(
          new CustomResponse(
            STATUSCODE.CREATED_STATUS,
            newUser,
            MESSAGE.USER_REGISTERED
          )
        );
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  @httpPost("/login")
  async login(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response | null> {
    try {
      const { email, password } = req.body;
      await loginValidator.validate({ email, password }, { abortEarly: false });
      const user = await this.authService.login(email, password);

      if (!user) {
        throw new CustomError(
          STATUSCODE.UNAUTHORIZED_STATUS,
          MESSAGE.USER_PASSWORD_WRONG
        );
      }

      return res
        .status(STATUSCODE.SUCCESS_STATUS)
        .json(
          new CustomResponse(
            STATUSCODE.SUCCESS_STATUS,
            user,
            MESSAGE.USER_LOGGED_IN
          )
        );
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  @httpPost("/logout", TYPES.AuthMiddleware)
  async logout(@request() req: Request, @response() res: Response) {
    try {
      const userId = req.headers.userId as string;
      const isLoggedOut = await this.authService.logout(userId);
      if (!isLoggedOut) {
        throw new CustomError(
          STATUSCODE.BAD_REQUEST,
          MESSAGE.USER_NOT_LOGGED_OUT
        );
      }
      return res
        .status(STATUSCODE.SUCCESS_STATUS)
        .json(
          new CustomResponse(
            STATUSCODE.SUCCESS_STATUS,
            null,
            MESSAGE.USER_LOGGED_OUT
          )
        );
    } catch (error) {
      return ErrorHandler(error);
    }
  }
}
