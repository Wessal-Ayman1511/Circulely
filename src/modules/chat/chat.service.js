import { Chat } from "../../db/models/chat.model.js";

export const sendMessage = async (req, res, next) => {
  const { friendId, message } = req.body;

  const chat = await Chat.findOne({
    users: { $all: [req.authUser._id, friendId] },
  });

  if (chat) {
    await Chat.updateOne({
      users: { $all: [req.authUser._id, friendId] },
    },{
        $push:{
            messages: {sender: req.authUser._id, message}
        }
    });
  } else {
    await Chat.create({
        users: [req.authUser._id, friendId],
        messages: [{sender: req.authUser._id, message}]
    })
  }

  return res.status(200).json({success: true})
};
