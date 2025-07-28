import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { verifyToken } from "../utlies/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { USer } from "../modules/user/user.model";
import { IsActive } from '../modules/user/user.interface';

 export const checkAuth=(...authRoles:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken=req.headers.authorization;
        if(!accessToken){
            throw new AppError(403,"no token receive")
        }
        const  verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
        const isUserExist = await USer.findOne({ email:verifiedToken.email});

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not Exist");
  }
  if (isUserExist.isActive===IsActive.BLOCKED||isUserExist.isActive===IsActive.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST,`user is ${isUserExist.isActive}`);
  }
  if (isUserExist.isDEleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

        if(!authRoles.includes(verifiedToken.role)){
            throw new AppError(403,"you are not a supper Admin or admin")
        }
        req.user=verifiedToken
        console.log(verifiedToken)
        next()
        
    } catch (error) {
        next(error)
    }

}
