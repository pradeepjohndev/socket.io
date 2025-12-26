/* import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static("public"))

io.on("connection", (Socket) => {
    console.log("new clinet added")
    Socket.emit("message", "hello from server");


    Socket.on("message", (msg) => {
        io.emit("message", msg)
    })

    Socket.on("disconnect", () => {
        console.log("clinet left")
    })
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
}) */


import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let counter = 0;

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.emit("count", counter);

    socket.on("increment", () => {
        counter++;
        io.emit("count", counter);
    });

    socket.on("decrement", () => {
        counter--;
        io.emit("count", counter);
    });

    socket.on("clr", () => {
        counter = 0;
        io.emit("count", counter);
    })
});

server.listen(3000, () => console.log("http://localhost:3000"));
