// utils/socket.js
const { Server } = require("socket.io");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
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

    socket.on("sendMessage", async ({ firstName, userId, targetUserId, text }) => {
      if (!text.trim()) return;

      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`💬 ${firstName}: ${text}`);

      try {
        // Find or create chat
        let chat = await Chat.findOne({
          participants: { $all: [mongoose.Types.ObjectId(userId), mongoose.Types.ObjectId(targetUserId)] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        // Save message
        chat.messages.push({
          senderId: mongoose.Types.ObjectId(userId),
          text,
        });
        await chat.save();

        // Emit message to room
        io.to(roomId).emit("messageReceived", {
          firstName,
          userId,
          text,
        });

      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
