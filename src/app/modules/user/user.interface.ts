import { Types } from "mongoose";

export enum Role{
    SUPPER_ADMIN="SUPPER_ADMIN",
    ADMIN="ADMIN",
    USER="USER",
    GUIDE="GUIDE"
}

export interface IAuthProvider{
    provider:"google"| "credentials";
    providerId:string 
}

export enum IsActive{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED",
}


export interface IUser{
    _id:Types.ObjectId,
    name:string;
    email:string;
    password ?:string;
    phone?:string;
    picture?:string;
    address?:string;
    isDEleted?:string;
    isActive?:IsActive;
    isVersified?:boolean;
    role:Role;
    auths:IAuthProvider[]
    booking?:Types.ObjectId[]
    guides?:Types.ObjectId[]
}