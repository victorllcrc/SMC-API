const socketIo = require('socket.io');
const jwt = require('jsonwebtoken')
const Message = require('../models/message')

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado:', socket.id)

        socket.on('message', async (data) => {

            const decoded = jwt.verify(data.token, process.env.SECRET_KEY)
            
            console.log('Mensaje recibido:', data)
            const dataMessage = {
                canalId: data.canalId,
                user: decoded.username,
                message: data.message
            }
            const newMessage = new Message(dataMessage)
            const savedMessage = await newMessage.save()
            io.emit('message', savedMessage)
        })
    })

    return io;
}
