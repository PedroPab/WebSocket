process.env.DEBUG = "socket.io:socket"

import express from "express";
import { createServer } from 'http'
import path from "path";
import { Server } from 'socket.io'
import { URL } from 'url';
import { instrument } from "@socket.io/admin-ui";

const __dirname = new URL('.', import.meta.url).pathname;

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://admin.socket.io'
    ],
    credentials: false,
  }
})

instrument(io, {
  auth: false
})

const listSockets = []

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'views/index.html')

})

io.use((socket, next) => {
  const token = socket.handshake.auth.token

  if (token !== '123') {
    //no esta autenticado
    const error = new Error('no puedes pasar')
    error.data = {
      details: 'no esta autorisado'
    }
    next(error)
  }
  //esta autenticado
  next()

})


io.on('connection', socket => {
  console.log(`${socket.id} se a conectado al namespace de profes`)

  socket.on('', () => {
  })

})



httpServer.listen(3005)