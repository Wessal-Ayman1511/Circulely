import { Post } from "../../../db/models/post.model.js";
import { roles } from "../../../db/models/user.model.js";
import { isAuthenticated } from "../../../graphql/authentication.js";
import { isAuthorized } from "../../../graphql/authorization.js";
import { isValid } from "../../../graphql/validation.js";
import { getPost as getPostValidation } from "../post.validation.js";

export const getPosts = async () => {
  const posts = await Post.find();
  return {
    success: true,
    statusCode: 200,
    data: posts,
  };
};

export const getPost = async (_, args, context) => {
  await  isAuthenticated(context);
  await isAuthorized([roles.USER], context)
  await isValid(getPostValidation , args)


  const post = await Post.findById(args.id);
  return {
    success: true,
    statusCode: 200,
    data: post,
  };
};
