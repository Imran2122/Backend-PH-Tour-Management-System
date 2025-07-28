
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { USer } from "./user.model";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await USer.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await USer.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await USer.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found");
  }

  // Authorization Checks
  if (!decodedToken?.role) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Token missing role");
  }

  // Role validation
  if (payload.role) {
    if (
      decodedToken.role === Role.USER ||
      decodedToken.role === Role.GUIDE
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update role");
    }

    if (
      payload.role === Role.SUPPER_ADMIN &&
      decodedToken.role === Role.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "Only SUPPER_ADMIN can assign this role");
    }
  }

  // Admin-only fields
  if (payload.isActive !== undefined || payload.isDeleted!== undefined || payload.isVerified!== undefined) {
    if (
      decodedToken.role === Role.USER ||
      decodedToken.role === Role.GUIDE
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update status fields");
    }
  }

  // Password hashing if provided
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  const updatedUser = await USer.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const getAllUsers = async () => {
  const users = await USer.find({});
  const totalUsers = await USer.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const userService = {
  createUser,
  getAllUsers,
  updateUser,
};
