import { model, Schema, Types } from "mongoose";


const postSchema = new Schema({
    content: {
        type: String,
        required: function() {
            return this.attachment.length == 0;
        }
    },
    attachment: [{
        secure_url: {type: String},
        public_id: {type: String}
    }],
    publisher: {type: Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Types.ObjectId, ref: 'User'}],
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}})

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'   
}
)

export const Post = model('Post', postSchema)