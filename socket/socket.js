const socketIo = require('socket.io');
const Message = require('../models/message')

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado:', socket.id)

        socket.on('message', async (data) => {
            console.log('Mensaje recibido:', data)
            const dataMessage = {
                canalId: "6758bb6044ab02804ce88bbf",
                user: "Gabriel Garro",
                message: data.message
            }
            const newMessage = new Message(dataMessage)
            const savedMessage = await newMessage.save()
            io.emit('message', savedMessage)
        })
    })

    return io;
}
