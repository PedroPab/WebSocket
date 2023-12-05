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
  console.log(`${socket.id} se a conectado al namespace de profes`)

  socket.on('isConnected', (message) => {
    console.log(`nes mesafge ${message}`)
  })

})



httpServer.listen(3005)