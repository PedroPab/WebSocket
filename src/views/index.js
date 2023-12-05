
const socket = io()

socket.on('connect', () => {
  console.log(`✨ el  socket se a conectado : ${socket.id}`)

})

const send = document.querySelector('#send')
const disconnect = document.querySelector('#disconnect')
const reconnect = document.querySelector('#connect')

send.addEventListener('click', () => {
  // if (!socket.connected) return
  socket.volatile.emit("isConnected", "esta connectado!")
})

disconnect.addEventListener('click', () => {
  console.log(`desconectaodo`)

  socket.disconnect()
})

reconnect.addEventListener('click', () => {
  console.log(`reconectado`)

  socket.connect()
})
