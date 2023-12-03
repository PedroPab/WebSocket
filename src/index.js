import express from "express";
import { createServer } from 'http'
import path from "path";
import { Server } from 'socket.io'
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const listSockets = []

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'views/index.html')

})


io.on('connection', socket => {
  console.log(`init connection , id: ${socket.id} `)
  listSockets.push(socket.id)
  console.log(`total de clientes conectados: ${io.engine.clientsCount} `)
  io.emit('connectionEvery', `se a conectado un nuevo cliete ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`el cliente socket id: ${socket.id}, se a desconectado`)

  })

  socket.on('circle position', pocition => {
    socket.broadcast.emit('move circle', pocition)
  })


})

httpServer.listen(3005)