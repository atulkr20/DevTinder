const { Server } = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) => {
    return crypto
    .createHash("sha256")
    .update([userId, targetUserId]
    .sort().join("_"))
    .digest("hex");

};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`${firstName} joined Room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage",  async ({ firstName, userId, targetUserId, text }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`💬 ${firstName}: ${text}`);

      // Save Messages to the database
    try {
        let chat = await Chat.findOne ({
            participants: { $all: [userId, targetUserId,] },
        });

        if(!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
        }

        chat.messages.push({
            senderId: userId,
            text,
        });

        await chat.save();

    }catch(err){
        console.log(err);
    }

      io.to(roomId).emit("messageReceived", { firstName, userId, text });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
