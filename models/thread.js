const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    mensajePrincipalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', 
        required: true
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

const Thread = mongoose.model('Thread', threadSchema)
module.exports = Thread