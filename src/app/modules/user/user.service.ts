import { IUser } from './user.interface';
import { USer } from './user.model';
const createUser=async (payload:Partial<IUser>)=>{
    const { name, email } = payload;

      const user = await USer.create({
      name,
      email,
    });

    return user
}

const getAllUsers=async()=>{
    const users=await USer.find({})
    const totalUsers=await USer.countDocuments()
    return {
        data:users,
        meta:{
            total:totalUsers
        }
    }
}

export const userService={
    createUser,getAllUsers
}

