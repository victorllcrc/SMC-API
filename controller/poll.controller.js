const Poll = require('../models/poll')
const decodeToken = require('../utils/decode_token')

exports.getAllPolls = async (req, res) => {
    try {
        const community_id = req.params.comunidad_id 
        
        const filter = { comunidadId: community_id }

        if ('is_activa' in req.query) {
            const estado = req.query.is_activa
            filter.is_activa = estado
        }

        const polls = await Poll.find(filter)

        if (!polls) {
            return res.status(404).json({ message: 'No se encontraron encuestas en la comunidad' })
        }

        res.status(200).json(polls)
    } catch(error) {
        res.status(500).json({ message: 'Error al recuperar encuestas' })
    }
}

exports.createPoll = async (req, res) => {
    try {
        const community_id = req.params.id 
        const user_id = decodeToken(req.params.user_id) // Token

        const newPoll = new Poll({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            opciones: req.body.opciones,
            comunidadId: community_id,
            creadorId: user_id
        })
        
        const savedPoll = await newPoll.save()
        res.status(201).json(savedPoll)

    } catch (error) {
        res.status(500).json({ message: 'Error al crear encuesta', error })
    }
}

exports.voteOption = async (req, res) => {
    try {
        const poll_id = req.params.poll_id
        const opcion = req.body.opcion
        const filter = { _id: poll_id, is_activa: true }

        const poll = await Poll.findOneAndUpdate(filter, 
            { $inc: { 'opciones.$[elem].votos': 1 } },
            {
                new: true,
                runValidators: true,
                arrayFilters: [{ 'elem.texto': opcion }]
            })
        
        if (!poll) {
            return res.status(404).json({ mensaje: 'Encuesta no encontrada o no activa' });
        }

        res.status(200).json(poll.opciones)
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar voto' })
    }
}

exports.updatePoll = async(req, res) => {
    try {
        const poll_id = req.params.id

        if ('is_activa' in req.body) {
            if (req.body.is_activa) {
                delete req.body.is_activa
            }
        }
        
        const updatedPoll = await Poll.findByIdAndUpdate(poll_id, req.body, {
            new: true,
            runValidators: true
        })

        if (!updatedPoll) {
            return res.status(404).json({ message: 'Encuesta no encontrada' })
        }

        res.status(201).json(updatedPoll)

    } catch (error) {
        res.status(500). json({ message: 'Error al actualizar encuesta', error })
    }
}

