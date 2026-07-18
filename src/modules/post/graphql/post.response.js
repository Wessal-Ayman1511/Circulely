import { GraphQLList } from "graphql";
import { postType } from "./post.type.js";


export const getPostsResponse = new GraphQLList(postType)
export const getPostResponse = postType