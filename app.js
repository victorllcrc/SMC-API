const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const path = require('path')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const config = require('./swagger/swagger')

const socketIo = require('./socket/socket')
const connectDB = require('./database/connection')

const app = express()
app.use(cors({
    origin: '*', 
    credentials: true, 
  }));
app.use(express.json());
dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080

app.use('/docs', swaggerUI.serve, swaggerUI.setup(config))
app.use('/', require('./routes/router'))
//app.get('/', (req, res) => { res.send('¡Hola Mundo!'); });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const server = http.createServer(app)
const io = socketIo(server)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})