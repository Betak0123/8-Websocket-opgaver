//kommentér alle linjer i koden 

// Vi henter express bibloteket ned så vi kan bruge det i koden. 
const express = require('express')
// 
const app = express()
//Opretter en variabel der indeholder vores portnummer
const port = 6969
//Når serveren bliver besøgt i roden uden nogle parametre smider vi public mappen i hovedet på dem. Dette er her en hjemmeside.
app.use('/', express.static('public'))
//Vi laver en konstant der lytter på porten vi har valgt. Derudover eksekvere vi en funktion når serveren starter, som her skriver en besked. 
const server = app.listen(port, () => {
  console.log('App listening on http://localhost:' + port)
})
//Vi opretter en variabel der henter socket.io bibloteket ned. 
const io = require("socket.io")
//Vi laver en websocket på vores server der køre på den port vi har valgt.
const serverSocket = io(server)

//En eventlistener der gennemløber en funktion når der er en klient der går connecter til vores websocket. 
serverSocket.on('connection', socket => {
  //Ligger en besked i terminalen, hvor id'et for klienten også er med.
  console.log('a user connected ' + socket.id)
  //Der bliver sendt en besked til den klient der liger er kommet på.  
  socket.emit('private', 'Her er en privat besked med dit id ' + socket.id)
  //Der bliver sendt en besked til ALLE klienter der er inde på vores websocket. 
  serverSocket.emit('everybody', 'Vi fik en ny klient med id ' + socket.id)
  //Der bliver sendt en besked til alle klienter UNDTAGEN den klient der lige er kommet ind på vores websocket.
  socket.broadcast.emit('everybody else', 'Besked fra den nye socket id ' + socket.id)
  //Websocket lytter på emnet fromClient. Når den modtager en besked derfra consolelogger beskeden i terminalen, og sender en besked tilbage til kun den klient der sendte beskeden.
  socket.on('fromClient', message => {
    console.log('Modtog besked: ' + message + ' på emnet fromClient')
    socket.emit('fromServer', 'Besked modtaget, tak for det.')
  })
})