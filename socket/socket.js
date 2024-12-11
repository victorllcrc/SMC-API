const socketIo = require('socket.io');
const Message = require('../models/message')

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado:', socket.id)

        socket.on('message', async (data) => {
            console.log('Mensaje recibido:', data)
            const dataMessage = {
                communityId: "674b5a25285b053e3cb60e39",
                roomId: "6758bb6044ab02804ce88bbf",
                user: "Gabriel Garro",
                message: data.message
            }
            const newMessage = new Message(dataMessage)
            await newMessage.save()
            io.emit('message', data)
        })
    })

    return io;
}
