const Message = require('../models/message')

exports.createMessage = async (req, res) => {
    try {
        const {comunidad_id, canal_id} = req.params
        const username = req.username // De las cookies
        const {message} = req.body
        
        const newMessage = await Message.create({communityId: comunidad_id, channelId: comunidad_id, roomId: canal_id, user: username, message: message}) 

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({message: 'Error al crear mensaje', error})
    }
}

exports.searchMessage = async (req, res) => {
    try {
        const {comunidad_id, canal_id} = req.params
        const {search} = req.body

        const filter = {}

        const search_regex = new RegExp(`${search}`, 'i')

        filter.communityId = comunidad_id
        filter.roomId = canal_id
        filter.message = search_regex

        const messages = await Message.find(filter)

        if(!messages){
            res.status(404).json({ message: 'No se encontraron mensajes con ese texto'})
        }

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: 'Error al buscar mensajes', error})
    }
}

exports.searchMessageV2 = async (req, res) => {
    try {
        const {comunidad_id, canal_id} = req.params

        const filter = {}

        filter.communityId = comunidad_id
        filter.roomId = canal_id

        const messages = await Message.find(filter)

        if(!messages){
            res.status(404).json({ message: 'No se encontraron mensajes con ese texto'})
        }

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: 'Error al buscar mensajes', error})
    }
}