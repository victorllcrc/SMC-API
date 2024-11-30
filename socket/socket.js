const socketIo = require('socket.io');

module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado:', socket.id)

        socket.on('message', (data) => {
            console.log('Mensaje recibido:', data)
            io.emit('message', data)
        })
    })

    return io;
}
