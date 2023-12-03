
const socket = io()


socket.on('connect', () => {
  console.log(`el  socket se a conectado : ${socket.id}`)
})

socket.on('disconnect', () => {
  console.log(`el  socket se a desconectado : ${socket.id}`)
})

const circle = document.getElementById('circle')
const drawCircle = (position) => {
  circle.style.top = position.top
  circle.style.left = position.left
}
const drag = e => {

  const position = {
    top: e.clientY + "px",
    left: e.clientX + "px"
  };

  drawCircle(position)

  socket.emit("circle position", position);

}
circle.addEventListener('mousedown', e => {
  circle.addEventListener('mousemove', drag)
})
circle.addEventListener('mouseup', e => {
  circle.removeEventListener('mousemove', drag)
})

socket.on('move circle', position => {
  drawCircle(position)
})