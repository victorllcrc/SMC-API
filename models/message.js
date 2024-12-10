const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true
    },
    roomId: { 
        type: mongoose.Schema.Types.ObjectId,  
        required: true 
    },
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
    }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message