import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New member added:");

  socket.on("message", (payload) => {
    console.log("Message received:", payload);

    socket.broadcast.emit("new-message", payload);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:");
  });

});

httpServer.listen(3000, () =>
  console.log("Server listening on port 3000")
);
