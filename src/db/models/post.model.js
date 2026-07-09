import { model, Schema, Types } from "mongoose";


const postSchema = new Schema({
    content: {
        type: String,
        required: function() {
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

export const Post = model('post', postSchema)