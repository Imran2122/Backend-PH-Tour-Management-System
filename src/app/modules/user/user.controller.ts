import { verifyToken,} from './../../utlies/jwt';
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { userService } from "./user.service";

import { catchAsync } from "../../utlies/catchAsynce";
import { sentResponse } from "../../utlies/sentResponse";
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';
//import AppError from "../../errorHelper/AppError";

// const createUserFunction=async(req:Request,res:Response)=>{
//   const user = await userService.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User created successfully",
//       user,
//     });
// }

// const createUser = async (req: Request, res: Response,next:NextFunction) => {
//   try {
//    // createUserFunction(req,res)
//     // throw new Error("fake error")
//     // throw new AppError(httpStatus.BAD_GATEWAY,"fake error")

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.error(err);
//    next(err)
//   }
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);


    sentResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"user create successfully",
      data:user
    })
  });


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId=req.params.id;

    const verifiedToken=req.user
    const patLoad=req.body;
    const user = await userService.updateUser(userId,patLoad,verifiedToken);


    sentResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"user updated successfully",
      data:user
    })
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUsers();
 
  sentResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"user create successfully",
      data:result.data,
      meta:result.meta
    })
};

//function paramiter hisabe function nibe and return korbe akta function
//function=> --req,res function

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser
};

//route machine ->controller ->service -> model-> DB
