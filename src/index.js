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

const teachers = io.of('teachers')
const students = io.of('students')
const defaut = io

teachers.on('connection', socket => {
  console.log(`${socket.id} se a conectado al namespace de profes`)

  socket.on('sendMessage', ({ user, message }) => {
    teachers.emit('message', `user: ${user}, ${message}`)
  })

})

students.on('connection', socket => {
  console.log(`${socket.id} se a conectado al namespace de students`)

  socket.on('sendMessage', ({ user, message }) => {
    students.emit('message', `user: ${user}, ${message}`)
  })
})

defaut.on('connection', socket => {
  console.log(`${socket.id} se a conectado al namespace de defaul;`)

  socket.on('sendMessage', ({ user, message }) => {
    defaut.emit('message', `user: ${user}, ${message}`)
  })

})

httpServer.listen(3005)