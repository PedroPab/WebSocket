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
  socket.connectedRoom = []
  const listRooms = {
    'room1': `room1`,
    'room2': `room2`,
    'room3': `room3`,
  }
  //se pide conneccion a una sala
  socket.on(`connectToRoom`, (room) => {
    //miramos que que la sala si existe
    const roomSelect = listRooms[room]
    if (!roomSelect) return

    socket.join(roomSelect)
    socket.connectedRoom.push(roomSelect)

  })
  socket.on(`desconnectToRoom`, (room) => {
    //miramos que que la sala si existe
    const roomSelect = listRooms[room]
    if (!roomSelect) return

    const roomindex = socket.connectedRoom.findIndex(eRoom => eRoom == room)
    if (roomindex == -1) {
      console.log(`no existe esta sala 404 `)
      return
    }

    socket.connectedRoom.splice(roomindex, 1)
    socket.leave(roomSelect)
  })
  //se envia un mensage
  socket.on(`message`, ({ room, message }) => {
    //miramos que que la sala si existe
    const roomSelect = listRooms[room]
    if (!roomSelect) {
      console.log(`no existe esta sala 404 `)
      return
    }

    //miramos que si este suscrito a la sala
    const isSuscrit = socket.connectedRoom.includes(roomSelect)
    if (!isSuscrit) {
      console.log(`no estas suscrito esta sala 404`)
      return
    }


    io.to(roomSelect).emit(`sendMessage`, {
      message,
      room: roomSelect
    })
    console.log(`el mensage se evio`, {
      message,
      room: roomSelect
    })

  })


})

httpServer.listen(3005)