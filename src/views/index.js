
const socket = io()


socket.on('connect', () => {
  console.log(`✨ el  socket se a conectado : ${socket.id}`)
})

socket.on('disconnect', () => {
  console.log(`🥊 el  socket se a desconectado : ${socket.id}`)
  return
})


//guardamos en un lista los checks de la subcripcion de las salas
let listRooms = [
  { idUl: `room1`, idCheck: `chechRoom1`, room: `room1`, optionText: `Sala 1` },
  { idUl: `room2`, idCheck: `chechRoom2`, room: `room2`, optionText: `Sala 2` },
  { idUl: `room3`, idCheck: `chechRoom3`, room: `room3`, optionText: `Sala 3` },
]

listRooms = listRooms.map(room => {
  const check = document.getElementById(room.idCheck)
  //ponemos todos los check en falso al inicar
  check.checked = false;
  const ul = document.getElementById(room.idUl)
  check.addEventListener('change', (e) => {

    if (e.target.checked) {
      console.log(`Checkbox ${room.idCheck} está marcado.`);
      addOptionToSelect("selecRoom", { value: room.room, text: room.optionText });
      socket.emit(`connectToRoom`, room.room)
    } else {
      console.log(`Checkbox ${room.idCheck} está desmarcado.`);
      removeOptionFromSelect("selecRoom", room.room);
      socket.emit(`desconnectToRoom`, room.room)
    }
  })

  return { ...room, check, ul }

})

const selectRoom = document.getElementById(`selecRoom`)
const message = document.getElementById(`message`)


const buttonEnviar = document.getElementById(`enviar`)
buttonEnviar.addEventListener(`click`, () => {
  console.log(`se preciono el boton `)

  socket.emit(`message`, {
    room: selectRoom.value,
    message: message.value,
  })
})

socket.on('sendMessage', ({ room, message }) => {
  //deberiamos de validar que el room si exita , pero me da peresa xd
  const indexRoom = listRooms.findIndex(eRoom => eRoom.room == room)
  console.log("🚀 ~ file: index.js:60 ~ socket.on ~ indexRoom:", indexRoom)
  if (indexRoom == -1) {
    console.log(`no existe esta sala`)
  }

  const li = document.createElement(`li`)
  li.textContent = message

  const selectRoom = listRooms[indexRoom]

  selectRoom.ul.append(li)


})


function addOptionToSelect(selectId, option) {
  var select = document.getElementById(selectId);
  var newOption = document.createElement("option");
  newOption.value = option.value;
  newOption.text = option.text;
  select.appendChild(newOption);
}

function removeOptionFromSelect(selectId, optionValue) {
  var select = document.getElementById(selectId);
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value == optionValue) {
      select.remove(i);
      break;
    }
  }
}
