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
    mienbros:{
        type: Number,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['personal', 'institucional']
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