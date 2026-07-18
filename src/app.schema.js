import { GraphQLObjectType, GraphQLSchema } from "graphql"
import { postQuery } from "./modules/post/graphql/post.query.js"

export const query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        /**
         * get posts
         * get post
         * get users
         * get user
         * get comments
         * get comment
         */
        ...postQuery
    }
})

export const schema = new GraphQLSchema({
    query
})