const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

// const socketIo = require('./socket/socket')
const socketIo = require('./socket/text_chat')
const connectDB = require('./database/connection')

const app = express()
app.use(express.json());
dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080

app.use('/', require('./routes/router'))
//app.get('/', (req, res) => { res.send('¡Hola Mundo!'); });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const server = http.createServer(app)
const io = new Server(server)

socketIo(io)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})