const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const path = require('path')
const cors = require('cors')

const socketIo = require('./socket/socket')
const connectDB = require('./database/connection')

const app = express()
app.use(cors())
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
const io = socketIo(server)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})