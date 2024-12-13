const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: false,
        trim: true,
    },
    opciones: [
        {
            texto: { 
                type: String, 
                required: true 
            },
            votos: { 
                type: Number,
                default: 0 
            }
        }
    ],
    comunidadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true,
    },
    creadorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    is_activa: {
        type: Boolean,
        default: true,
    }
})

const Poll = mongoose.model('Poll', pollSchema)
module.exports = Poll