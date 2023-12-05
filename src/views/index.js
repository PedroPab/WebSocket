
const socket = io({
  auth: {
    token: '1234'
  }
})

socket.on('connect', () => {
  console.log(`✨ el  socket se a conectado : ${socket.id}`)

})
socket.on('disconnection', () => {
  console.log(`no se pudo conectar`)

})
socket.on('connect_error', (error) => {
  console.log(`error de connecion `, error.data.details)

})