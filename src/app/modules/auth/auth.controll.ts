import { envVars } from './../../config/env';
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utlies/catchAsynce";
import { sentResponse } from "../../utlies/sentResponse";
import { AuthService } from "./auth.servece";
import AppError from "../../errorHelper/AppError";
import { setAuthCookie } from "../../utlies/setCookies";
import { createUserTokens } from "../../utlies/userToken";
import { JwtPayload } from 'jsonwebtoken';

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

    
    // res.cookie("accessToken", loginInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    setAuthCookie(res,loginInfo)

    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    sentResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user login successfully",
      data: loginInfo,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "no refresh token receive");}


    const tokenInfo = await AuthService.getNewAccessToken( refreshToken as string);
    //  res.cookie("accessToken", tokenInfo.accessToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    setAuthCookie(res,tokenInfo)


    sentResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "new access token successfully",
      data: tokenInfo,
    });
  }
);
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })


    sentResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user out successfully",
      data: null,
    });
  }
);

const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let redirectTo=req.query.state ? req.query.state as string:"";
  if(redirectTo.startsWith("/")){
redirectTo=redirectTo.slice(1)
  }
const user=req.user;
console.log("user",user)
if(!user){
  throw new AppError(httpStatus.NOT_FOUND,"User Not Found")
}
const tokenInfo= createUserTokens(user)
setAuthCookie(res,tokenInfo)

  

    // res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
  }
);
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const newPassword=req.body.newPassword;
  const oldPassword=req.body.oldPassword;
  const decodedToken=req.user
  await AuthService.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload);
    sentResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user password change successfully",
      data: null,
    });
  }
);


//user->login--tokon (email,role.id)-- boookinh/apyment /payment cancle

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
  resetPassword,
  googleCallbackController
};
