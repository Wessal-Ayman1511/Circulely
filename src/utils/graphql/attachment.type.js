import { GraphQLObjectType, GraphQLString, graphqlSync } from "graphql";

export const attachmentType = new GraphQLObjectType({
    name: 'attachment',
    fields: {
        secure_url: {type: GraphQLString},
        public_id: {type: GraphQLString} 
    }
})