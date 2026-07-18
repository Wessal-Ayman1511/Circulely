import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  graphqlSync,
} from "graphql";
import { attachmentType } from "../../../utils/graphql/attachment.type.js";

export const userType = new GraphQLObjectType({
  name: "user",
  fields: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    gender: { type: GraphQLString },
    role: { type: GraphQLString },
    isDeleted: { type: GraphQLBoolean },
    deletedAt: { type: GraphQLString },
    profilePic: { type: attachmentType },
    provider: { type: GraphQLString },
  },
});
