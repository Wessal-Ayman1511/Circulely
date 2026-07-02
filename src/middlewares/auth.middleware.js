import { User } from "../db/models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

    const { authorization } = req.headers;
    if(!authorization)  {
      next(new Error("token is required", {cause: 404}));}
    if(!authorization.startsWith('access')){
      next(new Error("invalid bearer key", {cause: 404}));}

    const token = authorization.split(' ')[1]
    const result = jwt.verify(token, process.env.JWT_KEY)
    if (result.error) return next(result.error)
    const userExist = await User.findById(result.id);

    if (!userExist) {
      next(new Error("user not found!", {cause: 404}));}
    

    if(userExist.isDeleted){
      return next(new Error('account is freezed please login first', {cause:400}))
    }

    if (userExist.deletedAt && userExist.deletedAt.getTime() > result.iat * 1000)
      return next(new Error('destroyed token', {cause:400}))
    req.authUser = userExist;
    next();

};
