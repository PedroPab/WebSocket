
const socket = io()

const chectSocketStatus = () => {
  console.log(`estado del socket : ${socket.connected}`)

}
console.log(`socket init`)

socket.on('connect', () => {
  console.log(`el  socket se a conectado : ${socket.id}`)
  chectSocketStatus()

})

socket.on('disconnect', () => {
  console.log(`el  socket se a desconectado : ${socket.id}`)
  chectSocketStatus()
})

socket.io.on('reconnect_attempt', () => {
  console.log(`estoy intentando reconectarme`)
  chectSocketStatus()
})