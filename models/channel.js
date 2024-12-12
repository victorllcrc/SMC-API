const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    is_texto: {
        type: Boolean,
        required: true,
    },
    comunidadId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Community', 
        required: true 
    }
})

const Channel = mongoose.model('Channel', channelSchema)
module.exports = Channel 