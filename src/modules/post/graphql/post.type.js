import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { attachmentType } from "../../../utils/graphql/attachment.type.js";
import { userType } from "../../user/graphql/user.type.js";
import { User } from "../../../db/models/user.model.js";

export const postType = new GraphQLObjectType({
  name: "post",
  fields: {
    content: { type: GraphQLString },
    attachment: {type: new GraphQLList(attachmentType)},
    publisher: {
        type: userType,
        resolve: async(parent) => {
            return await User.findById(parent.publisher)
        } 
    },
    likes: {
        type: new GraphQLList(userType),
        resolve: async(parent) => {
            return await User.find({_id: {$in: parent.likes}})
        }
    },
    numOfLikes: {
        type: GraphQLInt,
        resolve: (parent) => {
            return parent.likes.length
        }
    },
    isDeleted: { type: GraphQLString },
  },
});
