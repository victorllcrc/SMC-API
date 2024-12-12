const mongoose = require('mongoose')

const communitySchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    miembros: [
        {
            usuarioId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            rol: {type: String, required: true}
        }
    ],
    image_url:{
        type: String,
        required: true
    },
    is_personal:{
        type: Boolean,
        required: true,
    },
    is_public:{
        type: Boolean,
        required: true
    },
    curso:{
        type: String,
        required: false
    },
    facultad:{
        type:String,
        required: false
    }
})

const Community = mongoose.model('Community', communitySchema)
module.exports = Community