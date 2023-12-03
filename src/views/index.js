
const socket = io()

const chectSocketStatus = () => {
  console.log(`estado del socket : ${socket.connected}`)

}
console.log(`socket init`)

socket.on('connect', () => {
  console.log(`el  socket se a conectado : ${socket.id}`)
  chectSocketStatus()

})

socket.on('connectionEvery', (data) => {
  console.log(data)

})

socket.on('welcome', (data) => {
  const text1 = document.getElementById('text1')
  text1.innerHTML = data
  console.log(`on welcome ${data}`)

})

const button1 = document.getElementById('button1')
button1.addEventListener('click', () => {
  console.log(`ser preciono el boton `)
  socket.emit('bottonPrecionado', 'se preciono el boton')

})

const buttonSaludar = document.getElementById('buttonSaludar')
buttonSaludar.addEventListener('click', () => {
  console.log(`ser preciono el boton buttonSaludar `)
  socket.emit('saludarUltimaPersona', 'hola como estas')

})



socket.on('disconnect', () => {
  console.log(`el  socket se a desconectado : ${socket.id}`)
  chectSocketStatus()
})


socket.on('saludo', (data) => {
  console.log(data)
})

socket.io.on('reconnect_attempt', () => {
  console.log(`estoy intentando reconectarme`)
  chectSocketStatus()
})