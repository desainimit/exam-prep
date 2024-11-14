import mongoose, { Schema } from "mongoose";
import { IUserDTO } from "@interfaces";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = bcrypt.hashSync(this.password, 10);
      this.password = hashedPassword;
      next();
    }
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("An error occurred"));
    }
  }
});

export const User = mongoose.model<IUserDTO>("User", UserSchema);
