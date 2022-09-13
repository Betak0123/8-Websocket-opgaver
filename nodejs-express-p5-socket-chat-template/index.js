
//hent biblioteket express ned i konstanten express 
const express = require('express')
//initialiser en instans - app - til din applikation  
const app = express()
//sæt en port
const port = 4000
//opret en variabel med et array til at gemme hele chatten undervejs
let chatHistory = ['Anna: Hvad så der', 'Peter: ikke så meget...']
//opret en mapping til mappen 'public' i serverens root 
app.use('/', express.static('public'))
//begynd at lytte på porten - og gem en reference til serveren 
const server = app.listen(port, () => {
  console.log('App listening on http://localhost:' + port)
})
//hent socket biblioteket
const io = require("socket.io")
//opret din serverSocket 
const serverSocket = io(server)
//lyt efter nye forbindelser på serverens socket 
serverSocket.on('connection', socket => {
  //du får et socket.id med som identificerer den nye klient 
  console.log('a user connected ' + socket.id)
  //send chathistorikken til den nye klient
  socket.emit('history', chatHistory.join('<br>'))
  //Lyt til chatbeskeder 
  socket.on('chatMessage', chatMessage => {
    //din kode her - se flowchart
  })
})