const Thread = require('../models/thread')
const Message = require('../models/message')

exports.createThread = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body  
        const mensajePrincipalId = req.params.message_id  

        const mainMessage = await Message.findById(mensajePrincipalId)  

        if (!mainMessage) {
            return res.status(404).json({ error: 'Mensaje principal no encontrado' })  
        }

        const newThread = new Thread({
            titulo,
            descripcion,
            mensajePrincipalId,
            comentarios: []
        })  

        const thread = await newThread.save()  
        res.status(201).json(thread)    
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el hilo' })  
    }
}

exports.getAllThreadsFromChannel = async (req, res) => {
    const { canal_id } = req.params;

    const messages = await Message.find({ canalId: canal_id }).select('_id');
    const messagesIds = messages.map(mensaje => mensaje._id);

    const threads = await Thread.find({ mensajePrincipalId: { $in: messagesIds } });

    res.status(200).json(threads);
}

exports.getThreadById = async (req, res) => {
    try {
        const thread_id = req.params.id  

        const thread = await Thread.findById(thread_id)
            .populate('mensajePrincipalId')
            .populate('comentarios')  // Similar al join en bases de datos relacionales

        if (!thread) {
            return res.status(404).json({ error: 'Hilo no encontrado' })  
        }

        res.status(200).json(thread)  
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el hilo' })  
    }
}

exports.addMessage = async (req, res) => {
    try {
        const thread_id = req.params.thread_id; 
        const message_id = req.params.message_id 

        // Buscar el hilo por ID
        const thread = await Thread.findById(thread_id).populate('mensajePrincipalId');

        if (!thread) {
            return res.status(404).json({ error: 'Hilo no encontrado' });
        }

        // Buscar el mensaje principal y el comentario
        const mainMessage = await Message.findById(thread.mensajePrincipalId);
        const message = await Message.findById(message_id);

        if (!mainMessage || !message) {
            return res.status(404).json({ error: 'Mensaje principal o comentario no encontrado' });
        }

        // Verificar que ambos mensajes pertenezcan al mismo canal
        if (mainMessage.canalId.toString() !== message.canalId.toString()) {
            return res.status(400).json({ error: 'El comentario y el mensaje principal no pertenecen al mismo canal' });
        }

        thread.comentarios.push(message_id);
        await thread.save();

        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el comentario' })  
    }
}

exports.updateThread = async (req, res) => {
    try {
        const thread_id = req.params.id  
        const { titulo, descripcion } = req.body  

        const thread = await Thread.findByIdAndUpdate(
            thread_id,
            { titulo: titulo, descripcion: descripcion},
            { new: true }
        )  

        if (!thread) {
            return res.status(404).json({ error: 'Hilo no encontrado' })  
        }

        res.status(200).json(thread)  
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el hilo' })  
    }
}

exports.deleteThread = async (req, res) => {
    try {
        const thread_id = req.params.id  

        const thread = await Thread.findByIdAndDelete(thread_id)  

        if (!thread) {
            return res.status(404).json({ error: 'Hilo no encontrado' })  
        }
        
        res.status(200).json(thread)  
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el hilo' })  
    }
}