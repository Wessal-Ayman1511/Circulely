import { model, Schema, Types } from "mongoose";


const commentSchema = new Schema({
    post: {type: Types.ObjectId, ref: 'Post', required: true},
    user: {type: Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Types.ObjectId, ref: 'User'}],
    text: {type: String, required: function() {return !this.attachment}},
    attachment: {
        secure_url: {type: String},
        public_id: {type: String}
    }
}, {timestamps: true})

export const Comment = model('Comment', commentSchema)