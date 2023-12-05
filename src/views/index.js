


const user = prompt(`escribe tu usuario`)

const profesores = [
  'JuanDc',
  'GNX',
  'Estefany',
  'Fredy',
]

let socketNameSpace, group

const chat = document.querySelector('#chat')
const nameSpace = document.querySelector('#nameSpace')

if (profesores.includes(user)) {

  socketNameSpace = io('/teachers')
  group = 'teachers'
} else {
  socketNameSpace = io('/students')
  group = 'students'
}

// const socket = io()


socketNameSpace.on('connect', () => {
  console.log(`✨ el  socket se a conectado : ${socketNameSpace.id}`)

  nameSpace.textContent = group



})

socketNameSpace.on('disconnect', () => {
  console.log(`🥊 el  socket se a desconectado : ${socketNameSpace.id}`)
  return
})

const sendMessage = document.querySelector('#sendMessage')
sendMessage.addEventListener('click', () => {
  const message = prompt('escribe tu mensage:')
  console.log("enviando el mensage", message)
  socketNameSpace.emit('sendMessage', { message: message, user: user })
})


socketNameSpace.on('message', (data) => {
  const li = document.createElement(`li`)
  li.textContent = data
  chat.append(li)
})