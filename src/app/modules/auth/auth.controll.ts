/* eslint-disable @typescript-eslint/no-unused-vars */
import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utlies/catchAsynce"
import { sentResponse } from '../../utlies/sentResponse';
import { AuthService } from './auth.servece';

const credentialsLogin=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //const user = await userService.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   message: "User created successfully",
    //   user,
    // });

const loginInfo=await AuthService.credentialsLogin(req.body)

    sentResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"user login successfully",
      data:loginInfo
    })
  });

//user->login--tokon (email,role.id)-- boookinh/apyment /payment cancle

export const AuthControllers={
    credentialsLogin
}