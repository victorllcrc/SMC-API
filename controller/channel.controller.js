const Community = require('../models/community')

exports.getAllChannels = async (req, res) => {
    try {
        // const community_id = req.community_id
        const {community_id} = req.params

        const community = await Community.findOne(community_id)

        if (!community) return res.status(400).json({message: 'Comunidad no existe'})

        res.status(200).json(community.canales)
    } catch(error) {
        res.status(500).json({message: 'Error al realizar búsqueda', error})
    }
}

exports.createChannel = async (req, res) => {
    try {
        const {community_id} = req.params
        const {nombre, type} = req.body

        const community = await Community.findOne(community_id)

        if (!community) return res.status(400).json({message: 'La comunidad no existe'})

        const newChannel = { nombre, type }
        community.canales.push(newChannel)

        await community.save()

        res.status(201).json(community.canales)
    } catch (error) {
        res.status(500).json({message: 'Error al agregar el canal', error})
    }
}