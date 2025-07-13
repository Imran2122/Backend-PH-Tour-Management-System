import  bcryptjs  from 'bcryptjs';
import { envVars } from "../config/env"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import { USer } from "../modules/user/user.model"

export const seedSupperAdmin=async()=>{
    try {
        const isSupperAdminExist=await USer.findOne({email:envVars.SUPPER_ADMIN_EMAIL})
        if(isSupperAdminExist){
            console.log("admin access")
            return;
        }


   const hasPAssword=await bcryptjs.hash(envVars.SUPPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND))

  const authProvider:IAuthProvider={provider:"credentials", providerId:envVars.SUPPER_ADMIN_EMAIL
  }  
        const payload:IUser={
            name:"Supper admin",
            role:Role.SUPPER_ADMIN,
            email:envVars.SUPPER_ADMIN_EMAIL,
            password:hasPAssword,
            isVersified:true,
            auths:[authProvider]
        }

    

        const supperAdmin=await USer.create(payload)
        console.log("supper admin create successfully")
     console.log(supperAdmin)
    } catch (error) {
        console.log(error)
    }
}