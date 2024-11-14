import { injectable } from "inversify";
import { CustomError, ErrorHandler, generateAccessToken } from "@utils";
import { STATUSCODE, MESSAGE } from "@constants";
import { IAuthService, ILoginResponse, IUserDTO } from "@interfaces";
import { User } from "@models";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

@injectable()
export class AuthService implements IAuthService {
  async register(userData: IUserDTO): Promise<IUserDTO | null> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { email, username } = userData;
      const existedUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existedUser) {
        throw new CustomError(
          STATUSCODE.BAD_REQUEST,
          MESSAGE.USER_ALREADY_EXISTS
        );
      }

      const [newUser] = await User.create([userData], { session });
      if (!newUser) {
        throw new CustomError(
          STATUSCODE.BAD_REQUEST,
          MESSAGE.FAIL_USER_REGISTER
        );
      }
      await session.commitTransaction();
      const user = newUser.toObject();
      delete user.password;
      delete user.__v;
      return user as IUserDTO;
    } catch (error) {
      await session.abortTransaction();
      return ErrorHandler(error);
    } finally {
      session.endSession();
    }
  }

  async login(email: string, password: string): Promise<ILoginResponse | null> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new CustomError(STATUSCODE.NOT_FOUND, MESSAGE.USER_NOT_FOUND);
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password as string
      );
      if (!isPasswordMatch) {
        throw new CustomError(
          STATUSCODE.UNAUTHORIZED_STATUS,
          MESSAGE.USER_PASSWORD_WRONG
        );
      }

      const accessToken = (await generateAccessToken(user._id)) as string;
      const loggedUser = (await User.findByIdAndUpdate(
        user._id,
        { isLoggedIn: true },
        { new: true, select: "-password -isLoggedIn -__v" }
      )) as IUserDTO;

      return { accessToken, user: loggedUser };
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  async logout(userId: string): Promise<boolean> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isLoggedIn: false },
        { new: true }
      );
      if (!user) {
        throw new CustomError(STATUSCODE.NOT_FOUND, MESSAGE.USER_NOT_FOUND);
      }
      return true;
    } catch (error) {
      return ErrorHandler(error);
    }
  }
}
