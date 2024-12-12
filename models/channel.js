const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    }
})