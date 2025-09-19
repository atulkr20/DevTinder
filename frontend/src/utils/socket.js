import { io } from "socket.io-client";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

let socket;

export const createSocketConnection = (userId) => {
  if (!socket) {
    if (location.hostname === "localhost") {
      socket = io(BASE_URL, {
        withCredentials: true,
        auth: { userId },
      });
    } else {
      socket = io(BASE_URL, {
        withCredentials: true,
        auth: { userId },
      });
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully! ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection failed:", err.message);
    });
  }

  return socket;
};
