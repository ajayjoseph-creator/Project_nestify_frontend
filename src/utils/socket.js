import { io } from "socket.io-client";

// Socket.IO client instance
export const socket = io("https://project-nestify-backend.onrender.com"); // Make sure this URL matches backend

// Room ID helper (centralized 🔁)
export const getRoomId = (id1, id2) => [id1, id2].sort().join("_");
