import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const globalErrorhandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `something is wrong !!!${err.message}`;

  if (err instanceof AppError){
    statusCode=err.statusCode
    message=err.message
  }else if(err instanceof Error){
    statusCode=500;
    message=err.message
  }
    res.status(statusCode).json({
      succuss: false,
      message: message,
      err,
      stack: envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
