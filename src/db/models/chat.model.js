import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    message: [{ type: String, required: true }],
    sender: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const chatSchema = new Schema({
  users: [{ type: Types.ObjectId, ref: "User", required: true }],
  messages: [messageSchema],
});

export const Chat = model('chat', chatSchema)
