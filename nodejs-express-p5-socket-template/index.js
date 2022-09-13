//kommenter alle linjer i koden 
const express = require('express')
// 
const app = express()
//
const port = 4000
//
app.use('/', express.static('public'))
//
const server = app.listen(port, () => {
  console.log('App listening on http://localhost:' + port)
})
//
const io = require("socket.io")
//
const serverSocket = io(server)

//
serverSocket.on('connection', socket => {
  //
  console.log('a user connected ' + socket.id)
  // 
  socket.emit('private', 'Her er en privat besked med dit id ' + socket.id)
  //
  serverSocket.emit('everybody', 'Vi fik en ny klient med id ' + socket.id)
  //
  socket.broadcast.emit('everybody else', 'Besked fra den nye socket id ' + socket.id)
  //
  socket.on('fromClient', message => {
    console.log('Modtog besked: ' + message + ' på emnet fromClient')
    socket.emit('fromServer', 'Besked modtaget, tak for det.')
  })
})