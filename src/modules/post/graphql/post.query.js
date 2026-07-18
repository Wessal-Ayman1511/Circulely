import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { postType } from "./post.type.js";
import { Post } from "../../../db/models/post.model.js";
import { getPostResponse, getPostsResponse } from "./post.response.js";
import { getPosts , getPost} from "./post.service.graphql.js";



export const postQuery = {
    getPosts: {
        type: getPostsResponse,
        resolve: getPosts
    },
    getPost:{
        type: getPostResponse,
        args: {id: {type: GraphQLID}},
        resolve: getPost
    }
}