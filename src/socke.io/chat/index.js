import { Chat } from "../../db/models/chat.model.js";

export const sendMessage = (socket, io) => {
  return async (data) => {
    // emit event
    const { message, destId } = data;
    console.log(destId, message);

    socket.to(destId).emit("receiveMessage", { message });
    socket.emit("successMessage", { message });

    // save in the db
    const chat = await Chat.findOne({
      users: { $all: [socket.id, destId] },
    });

    if (chat) {
      await Chat.updateOne(
        {
          users: { $all: [socket.id, destId] },
        },
        {
          $push: {
            messages: { sender: socket.id, message },
          },
        },
      );
    } else {
      await Chat.create({
        users: [socket.id, destId],
        messages: [{ sender: socket.id, message }],
      });
    }
  };
};
