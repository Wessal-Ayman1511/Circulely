import { mode } from "crypto-js";
import { Schema, Types } from "mongoose";


const postSchema = new Schema({
    content: {
        type: String,
        required: () => {
            this.attachment.length == 0;
        }
    },
    attachment: [{
        secure_url: {type: String},
        public_id: {type: String}
    }],
    publisherId: {type: Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Types.ObjectId, ref: 'User'}],
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true})

export const Post = mode('post', postSchema)