const Message = require('../models/message')

module.exports = (io) => {
    io.on('connection', async (socket) => {
        console.log('Conexión exitosa socket.io')

        // Escucha evento JoinRoom (del frontend) y devuelve mensajes pasados
        socket.on("joinRoom", async ({community_id, room_id}) => {
            const socketRoom = community_id + '/' + room_id
            socket.join(socketRoom)
            console.log(`Usuario se unió a la sala ${socketRoom}`)

            // Busca mensajes anteriores
            const messages = await Message.find({roomId: room_id}).sort({timestamp: 1})

            socket.emit('roomMessages', messages)
        })

        // Envía mensajes y los guarda la base de datos
        socket.on('message', async ({community_id, room_id, username, message}) => {
            const newMessage = await Message.create({communityId: community_id, roomId: room_id, user: username, message: message}) 
            io.to(room_id).emit('message', newMessage) 
        }) 
    })
}