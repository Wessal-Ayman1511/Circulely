import { Post } from "../../../db/models/post.model.js";

export const getPosts = async () => {
  return await Post.find();
};

export const getPost = async (_, args) => {
  return await Post.findById(args.id);
};
