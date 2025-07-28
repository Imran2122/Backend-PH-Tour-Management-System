/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IsActive, IUser } from "../user/user.interface";
import { USer } from "../user/user.model";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../../utlies/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshTOken, createUserTokens } from "../../utlies/userToken";

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


const userToken=createUserTokens(isUserExist)



const {password: pass,...rest}=isUserExist.toObject()
  return {
    accessToken:userToken.accessToken,
    refreshToken:userToken.refreshToken,
    user:rest
  };
};


const getNewAccessToken = async (refreshToken:string) => {

const newAccessToken=await createNewAccessTokenWithRefreshTOken(refreshToken)
  return {
  accessToken:newAccessToken
  };
};


const resetPassword = async (oldPassword:string,newPassword:string,decodedToken:JwtPayload) => {
// const user=await USer.findOne(decodedToken.userId)
const user = await USer.findOne({ _id: decodedToken.userId });


// eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
const isOldPasswordMatch=await bcryptjs.compare(oldPassword,user!.password as string)
if(!isOldPasswordMatch){
  throw new AppError(httpStatus.UNAUTHORIZED,'old password does not match')
}
user!.password= await bcryptjs.hash(newPassword,Number(envVars.BCRYPT_SALT_ROUND))
user!.save()

}


export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword
};
