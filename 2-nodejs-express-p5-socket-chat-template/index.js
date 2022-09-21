
const express = require('express')
const ip = require('ip')
const io = require("socket.io")

//initialiser en instans - app - til din applikation  
const app = express()
const port = 6969 

//opret en variabel med et array til at gemme hele chatten undervejs
let chatHistory = []

app.use('/', express.static('public'))

// Opretter et array til at holde alle users og deres ID i
let users = []

//begynd at lytte på porten - og gem en reference til serveren 
const server = app.listen(port, () => {
  console.log('App listening on http://localhost:' + port + ' Med ip: '+ip.address())
})

//opret din serverSocket 
const serverSocket = io(server)

serverSocket.on('connection', socket => {
  //du får et socket.id med som identificerer den nye klient 
  console.log('a user connected ', socket.id)
  
  //lyt efter nye forbindelser på serverens socket   
  socket.on('newUser', UserMessage => {
    console.log('message on newUser')    
    users[socket.id] = ({"name": UserMessage.name, "house": UserMessage.house})
    console.log(users)
  })

  //send chathistorikken til den nye klient
  socket.emit('history', chatHistory)


  //Lyt til chatbeskeder 
  socket.on('chatMessage', chatMessage => {
    //din kode her - se flowchart
    console.log('Fik besked fra bruger med ID: ', socket.id)
    console.log(users[socket.id].name)

    let newMessage = {}
    newMessage.message = chatMessage
    newMessage.name = users[socket.id].name
    newMessage.house = users[socket.id].house
    socket.broadcast.emit('chat', newMessage)
    chatHistory.push(newMessage)
    console.log('Ny besked: ' + newMessage)
    console.log(chatHistory)


  }) 
})