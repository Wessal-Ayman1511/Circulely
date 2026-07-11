import { model, Schema, Types } from "mongoose";
import cloudinary from "../../utils/file-upload/cloud-config.js";

const commentSchema = new Schema(
  {
    post: { type: Types.ObjectId, ref: "Post", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Types.ObjectId, ref: "User" }],
    text: {
      type: String,
      required: function () {
        return !this.attachment;
      },
    },
    attachment: {
      secure_url: { type: String },
      public_id: { type: String },
    },
    parentId: { type: Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true },
);

commentSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc, next) {
    const replies = await this.constructor.find({ parentId: doc._id });
    if (replies.length) {
      for (const reply of replies) {
        if (reply.attachment.public_id)
          await cloudinary.uploader.destroy(reply.attachment.public_id);
        await reply.deleteOne();
      }
    }
    next();
  },
);
export const Comment = model("Comment", commentSchema);
