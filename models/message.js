const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({  
    user: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    canalId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',  
        required: true 
    }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message