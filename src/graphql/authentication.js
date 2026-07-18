
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model.js";

export const isAuthenticated = async (context) => {

    const { authorization } = context;
    if(!authorization) 
        throw new Error("token is required", {cause: 404});
    if(!authorization.startsWith('access')) 
        throw new Error("invalid bearer key", {cause: 404})

    const token = authorization.split(' ')[1]
    const result = jwt.verify(token, process.env.JWT_KEY)
    if (result.error) throw result.error
    const userExist = await User.findById(result.id);
    if (!userExist) 
      throw Error("user not found!", {cause: 404});
    

    if(userExist.isDeleted){
      throw new Error('account is freezed please login first', {cause:400})
    }

    if (userExist.deletedAt && userExist.deletedAt.getTime() > result.iat * 1000)
      throw new Error('destroyed token', {cause:400})
    context.authUser = userExist;

};

