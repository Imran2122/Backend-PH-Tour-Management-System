import { NextFunction, Request, Response } from "express";

import httpStatus, { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";

import { catchAsync } from "../../utlies/catchAsynce";
import { sentResponse } from "../../utlies/sentResponse";
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
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //   message: "User created successfully",
    //   user,
    // });
    sentResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"user create successfully",
      data:user
    })
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUsers();
  // res.status(httpStatus.OK).json({
  //   success:true,
  //   message:"ALL User Retrieve successfully",
  //   data:users
  // })
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
};

//route machine ->controller ->service -> model-> DB
