const Message = require('../models/message')
const User = require('../models/user')
const decodeToken = require('../utils/decode_token')

exports.createMessage = async (req, res) => {
    try {
        const {canal_id} = req.params
        const user_id = decodeToken(req.params.user_id) // Token
        const {message, type} = req.body

        const user = await User.findById(user_id)
        
        const newMessage = await Message.create({user: user.username, message: message, canalId: canal_id, type: type}) 

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({message: 'Error al crear mensaje', error})
    }
}

exports.searchMessage = async (req, res) => {
    try {
        const {canal_id} = req.params
        const {search} = req.body

        const filter = {}

        const search_regex = new RegExp(`${search}`, 'i')

        filter.canalId = canal_id
        filter.message = search_regex
        // Solo mensajes de tipo texto
        filter.type = "texto"

        const messages = await Message.find(filter)

        if (messages.length === 0){
            return res.status(404).json({ message: 'No se encontraron mensajes de texto con ese criterio' })
        }

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: 'Error al buscar mensajes', error})
    }
}

exports.searchMessageV2 = async (req, res) => {
    try {
        const {canal_id} = req.params

        const filter = {}

        filter.canalId = canal_id

        const messages = await Message.find(filter)

        if(!messages){
            return res.status(404).json({message: 'No se encontraron mensajes con ese texto'})
        }

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: 'Error al buscar mensajes', error})
    }
}