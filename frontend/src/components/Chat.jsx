import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { id: targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (!socketRef.current || !newMessage.trim()) return;

    const messageData = {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        {/* Chat title */}
        <h1 className="text-2xl font-bold mb-4">Chat</h1>

        {/* messages container */}
        <div className="border border-gray-700 rounded-2xl p-4 h-96 overflow-y-auto mb-4 bg-gray-700">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 p-3 rounded-3xl max-w-xs break-words ${
                  msg.userId === userId
                    ? "bg-gray-500 ml-auto text-right"
                    : "bg-gray-600 mr-auto text-left"
                }`}
              >
                <p className="text-sm font-semibold mb-1">{msg.firstName}</p>
                <p>{msg.text}</p>
              </div>
            ))
          )}
        </div>

        {/* input + send */}
        <div className="flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-600 rounded-full p-3 text-white placeholder-gray-400"
            placeholder="Type a message..."
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
