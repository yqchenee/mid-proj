const express = require('express')
const mongoose = require('mongoose')

const Message = require('./models/message')

// Create server to serve index.html
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3001

// Routing
app.use(express.static('client/public'))

// Socket.io serverSocket
const serverSocket = require('socket.io')(http)

// Start server listening process.
http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

// Connect to mongo
mongoose.connect('< Your MONGOdb >', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
    serverSocket.emit('dbfault')
})
db.once('open', () => {
    console.log('MongoDB connected!')
    serverSocket.on('connection', socket => {
        const sendStatus = s => {
            console.log('server send status')
            socket.emit('status', s)
        }

        socket.on( 'inputName' , Name => {
            console.log(Name)
            socket.emit('inputNameBack')
        })

        socket.on('need init' , data => {
            Message.find( {'name': data.name })
                .sort({date : 1})
                .exec( (err , res) => {
                    if (err) throw err
                    socket.emit('init' , res)
                    //console.log(res)
                })
            
        })
            
        socket.on( 'require' , () => {
            socket.emit( 'newdata' , {name : 'Skk' , money : '33' , body : '錢'} )
        })

        socket.on('input', data => {
            console.log('input')
            let name = data.name
            let money = data.money
            let body = data.body
            let date = new Date(data.date)
            data.date = date 
            
            // Insert message
            const message = new Message( { name : name , date : date, money : money ,  body : body } )
            message.save(err => {
                if (err) console.error(err)

                serverSocket.emit('output', data )

                // Saved!
                sendStatus(
                    'Message sent',
                )
            })
            
        })

        socket.on('clear', () => {
            // Remove all chats from collection
            Message.deleteMany({}, () => {
                // Emit cleared
                socket.broadcast.emit('cleared')
            })
        })
    })
})
