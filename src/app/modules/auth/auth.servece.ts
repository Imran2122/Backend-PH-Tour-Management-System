import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { USer } from "../user/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTOken } from "../../utlies/jwt";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await USer.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not Exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_GATEWAY, "incorrect password");
  }

  //jwt
  const jwtPayload = {
    userId : isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

 const accessToken =generateTOken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)


  return {
    accessToken
  };
};

export const AuthService = {
  credentialsLogin,
};
