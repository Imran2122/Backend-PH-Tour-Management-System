
import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status-codes";
import { userService } from "./user.service";

import { catchAsync } from "../../utlies/catchAsynce";
import { sentResponse } from "../../utlies/sentResponse";
import { JwtPayload } from "jsonwebtoken";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);


    sentResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"user create successfully",
      data:user
    })
  });


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId=req.params.id;

    const verifiedToken=req.user
    const patLoad=req.body;
    const user = await userService.updateUser(userId,patLoad,verifiedToken as JwtPayload);


    sentResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"user updated successfully",
      data:user
    })
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUsers();
 
  sentResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
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
