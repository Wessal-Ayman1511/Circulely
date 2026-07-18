import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { postType } from "./post.type.js";


export const getPostsResponse = new GraphQLObjectType({
    name: "getPostsResponse",
    fields: {
        success: {type: GraphQLBoolean},
        statusCode: {type: GraphQLInt},
        data:{type: new GraphQLList(postType)}
    }
})
export const getPostResponse = new GraphQLObjectType({
    name: "getSinglePostResponse",
    fields: {
        success: {type: GraphQLBoolean},
        statusCode: {type: GraphQLInt},
        data: {type: postType}
    }
})