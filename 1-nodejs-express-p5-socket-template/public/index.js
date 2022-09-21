//kommenter alle linjer i koden

let clientSocket

//Setup bliver kørt 1 gang når serveren starter. 
function setup(){
    //Sæt variablen client til at være io.connect(), som får Klienten (Altså den her mappe) til at connect til vores websocket
    clientSocket = io.connect()
    //Lyt efter beskeder på emnet everybody, og skriv beskeden ude i konsollen. 
    clientSocket.on('everybody', message => {
        console.log('Got message from server to all clients: ' + message)
    })
    //Lyt efter beskeder på emnet private, og skriv beskeden ude i konsollen. 
    clientSocket.on('private', message => {
        console.log('Got private message from server: ', message)
    })
    //Lyt efter beskeder på emnet fromServer, og skriv beskeden ude i konsollen. Derudover sæt teksten fra beskeden ind i div'en med ID=answer. Denne besked bliver dog kun sent til klienten, når den selv klikker på elementet med ID someButton. 
    clientSocket.on('fromServer', message => {
        console.log('Got reply from server: ', message)
        select('#answer').html(message)
    })
    //Når elemtet med ID someButton bliver klikket på, så send en besked til serveren. 
    select('#someButton').mousePressed(()=>{
        clientSocket.emit('fromClient', 'Hej med dig server')
    })
}