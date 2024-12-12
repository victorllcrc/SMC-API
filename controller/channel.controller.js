const Channel = require('../models/channel')

exports.getAllChannels = async (req, res) => {
    try {
        // const community_id = req.community_id
        const {comunidad_id} = req.params

        const channels = await Channel.find({comunidadId: comunidad_id})

        if (!channels) return res.status(400).json({message: 'No se encontraron canales'})

        res.status(200).json(channels)
    } catch(error) {
        res.status(500).json({message: 'Error al realizar búsqueda', error})
    }
}

exports.createChannel = async (req, res) => {
    try {
        const {comunidad_id} = req.params
        const {nombre, is_texto} = req.body

        const newChannel = { 
            nombre: nombre,
            is_texto: is_texto,
            comunidadId: comunidad_id
        }

        const channel = new Channel(newChannel)
        const savedChannel = await channel.save()

        res.status(201).json(savedChannel)
    } catch (error) {
        res.status(500).json({message: 'Error al agregar el canal', error})
    }
}