// utils/socket.js
import { io } from "socket.io-client";

export const BASE_URL = "http://localhost:3000";

let socket;

export const createSocketConnection = (userId) => {
  if (socket) return socket;

  socket = io(BASE_URL, {
    withCredentials: true,
    auth: { userId }, // Use auth instead of query
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected successfully! ID:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection failed:", err.message);
  });

  return socket;
};
