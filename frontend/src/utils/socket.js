import { io } from "socket.io-client";

export const BASE_URL = "http://localhost:3000";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
  return socket;
};
