import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { id: targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  // Fetch chat messages
  const fetchChatMessages = async () => {
    if (!userId || !targetUserId) return;
    try {
      const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = response.data.messages.map((msg) => ({
        firstName: msg.senderId.firstName,
        userId: msg.senderId._id,
        text: msg.text,
      }));
      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [userId, targetUserId]);

  // Socket connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection(userId);
    socketRef.current = socket;

    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

    socket.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socketRef.current || !newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl flex flex-col h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>
        <div className="flex-1 border border-gray-700 rounded-2xl p-4 overflow-y-auto mb-4 bg-gray-700">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-3xl max-w-xs break-words ${
                msg.userId === userId ? "bg-gray-500 ml-auto text-right" : "bg-gray-600 mr-auto text-left"
              }`}
            >
              <p className="text-sm font-semibold mb-1">{msg.firstName}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="flex mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-600 rounded-full p-3 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 rounded-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
