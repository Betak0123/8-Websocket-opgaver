// const { Socket } = require("socket.io")

let clientSocket
let chatHistory 
let myName, myHouse
    function setup(){
        //spørg serveren om en socket forbindelse
        clientSocket = io.connect()

        //modtag array med chat historik
        clientSocket.on('history', history => {
            
            history.map(( hist =>{
                histp = createElement('p')
                histp.html(hist.name +': '+  hist.message)
                histp.style('background-color', hist.house)
                histp.addClass('p')
                select('#chatBox').child(histp)
                select('#chatBox').elt.scrollTop = select('#chatBox').elt.scrollHeight

            }))
            
            console.log('modtog chathistorik: ', history)
        })

        clientSocket.on('newMessage', message => {
            console.log(message)
            //console.log(userInfo)
            chatp = createElement('p')
            chatp.html(message.name +': '+  message.message)
            chatp.style('background-color', message.house)
            chatp.addClass('p')
            select('#chatBox').child(chatp)
            select('#chatBox').elt.scrollTop = select('#chatBox').elt.scrollHeight
        })





        //når brugeren trykker ok på navnesiden
        select('#okButton').mousePressed(()=>{
            //Hvis der er skrevet et navn i input feltet
            if(select('#nameInput').value()!='' && select('#House-select').value()!=''){
                //gem brugernavnet i din variabel
                myName = select('#nameInput').value()
                myHouse = select('#House-select').value()
                clientSocket.emit('newUser', ({"name": myName, "house": myHouse}))
                select('#namePage').addClass('hidden')
                select('#chatPage').removeClass('hidden')

                console.log(select('#House-select').value())
                //din kode her - se flowchart

            }
        })

        select('#sendButton').mousePressed(()=>{
            if(select('#chatMessage').value()!=''){
                let message = select('#chatMessage').value()
                
                let p = createElement('p', message)
                select('#chatBox').child(p)
                // select('#chatBox').html(message)
                select('#chatBox').elt.scrollTop = select('#chatBox').elt.scrollHeight
                p.html(myName + ': '+ message)

                console.log(message)
                clientSocket.emit('chatMessage', message) 

                p.style('background-color', myHouse)
                p.addClass('p')
                select('#chatMessage').value('')

            }
        })
    }



    function keyPressed(){
        if(key == 'Enter' ){
            if(select('#chatMessage').value()!=''){
                let message = select('#chatMessage').value()
                
                let p = createElement('p', message)
                select('#chatBox').child(p)
                // select('#chatBox').html(message)
                select('#chatBox').elt.scrollTop = select('#chatBox').elt.scrollHeight
                p.html(myName + ': '+ message)

                console.log(message)
                clientSocket.emit('chatMessage', message) 
                p.style('background-color', myHouse)
                p.addClass('p')
                select('#chatMessage').value('')
            } 
        }
        // console.log(key)
    }
    // select('#House-select').value()