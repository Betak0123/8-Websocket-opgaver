//kommenter alle linjer i koden
let clientSocket

// 
function setup(){
    //
    clientSocket = io.connect()
    //
    clientSocket.on('everybody', message => {
        console.log('Got message from server to all clients: ' + message)
    })
    //
    clientSocket.on('private', message => {
        console.log('Got private message from server: ', message)
    })
    //
    clientSocket.on('fromServer', message => {
        console.log('Got reply from server: ', message)
        select('#answer').html(message)
    })
    //
    select('#someButton').mousePressed(()=>{
        clientSocket.emit('fromClient', 'Hej med dig server')
    })
}