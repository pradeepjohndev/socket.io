import { Server } from "socket.io";
import { createServer } from "http";
import express from 'express';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer,{
    cors: {
        Method : ["GET", "POST"],
        origin : "*",
    },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("hello", (msg, callback) => {
    console.log("Received:", msg);

    callback("got it"); 
  });
});

httpServer.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);