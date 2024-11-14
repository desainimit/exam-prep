import config from "config";
import { CustomError, ErrorHandler } from "@utils";
import { STATUSCODE, MESSAGE } from "@constants";
import jwt from "jsonwebtoken";
import { User } from "@models";

export const generateAccessToken = async (
  userId: string
): Promise<string | null> => {
  try {
    const user = await User.findById(userId).select("_id");
    if (!user) {
      throw new CustomError(STATUSCODE.NOT_FOUND, MESSAGE.USER_NOT_FOUND);
    }
    const accessToken = await jwt.sign(
      {
        _id: user._id,
      },
      config.get("ACCESS_TOKEN_SECRET") as string,
      {
        expiresIn: config.get("ACCESS_TOKEN_LIFE") as string,
      }
    );

    return accessToken;
  } catch (error) {
    return ErrorHandler(error);
  }
};
