import { Chat } from "../../db/models/chat.model.js";
import { messages } from "../../utils/messages.js/index.js";

export const sendMessage = async (req, res, next) => {
  const { friendId, message } = req.body;

  const chat = await Chat.findOne({
    users: { $all: [req.authUser._id, friendId] },
  });

  if (chat) {
    await Chat.updateOne(
      {
        users: { $all: [req.authUser._id, friendId] },
      },
      {
        $push: {
          messages: { sender: req.authUser._id, message },
        },
      },
    );
  } else {
    await Chat.create({
      users: [req.authUser._id, friendId],
      messages: [{ sender: req.authUser._id, message }],
    });
  }

  return res.status(200).json({ success: true });
};

export const getChat = async (req, res, next) => {
  const { friendId } = req.params;

  const chat = await Chat.findOne({
    users: { $all: [req.authUser._id, friendId] },
  }).populate([
    {path: 'users'},
    {path: 'messages.sender'}
  ]);
  if(!chat) return next(new Error(messages.chat.notFound, {cause: 404}))
  return res.status(200).json({success: true, data: {chat}})
};
