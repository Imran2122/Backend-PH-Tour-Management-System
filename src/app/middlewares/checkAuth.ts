import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { verifyToken } from "../utlies/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

 export const checkAuth=(...authRoles:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const accessToken=req.headers.authorization;
        if(!accessToken){
            throw new AppError(403,"no token receive")
        }
        const  verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
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
