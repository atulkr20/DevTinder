// chatRouter.js

const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
        path: "messages",           // 1. Populate the 'messages' array first
        populate: {                 // 2. Then, populate inside each message
            path: "senderId",       // The field to populate (senderId)
            model: "User",          // The model to use ('User')
            select: "firstName", // Select the fields you want
        },
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" }); // It's good practice to send a response on error
  }
});

module.exports = chatRouter;