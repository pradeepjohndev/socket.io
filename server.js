import express from 'express'
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
})