const Community = require('../models/community')
const jwt = require('jsonwebtoken') 

exports.getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find()
        res.status(200).json(communities)
        
    } catch (error) {
        res.status(500).json({message: 'Error al obtener comunidades'})
    }
}

exports.getCommunityById = async (req, res) => {
    try {
        const id = req.params.id

        const community = await Community.findById(id)
        if(!community){
            return res.status(404).json({ message: 'Comunidad no encontrada'})
        }
        res.status(200).json(community)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener Comunidad', error})
    }
}

// exports.createCommunity = async (req, res)=>{
//     try {
//         const newCommunity = new Community(req.body)
//         const community = await newCommunity.save()
//         res.status(201).json(community)
//     } catch (error) {
//         res.status(500).json({message: 'Error al intentar crear comunidad', error})
//     }
// }

// Cuando alguien crea una comunidad, automáticamente se le da el rol de ADMINISTRADOR
exports.createCommunity = async (req, res)=>{
        try {
            const user_id = req.user_id
            req.body.miembros = [{usuarioId: user_id, rol: "Administrador"}]            
            const newCommunity = new Community(req.body)
            const community = await newCommunity.save()
            res.status(201).json(community)
        } catch (error) {
            res.status(500).json({message: 'Error al intentar crear comunidad', error})
        }
}

exports.searchCommunity = async (req, res) => {
    try {
        const nombre  = req.body.nombre
        const is_public  = req.body.is_public
        const is_member = req.body.is_member
        const token = req.body.token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user_id = decoded.id

        const filter = {}
        
        if(nombre){
            const regex = new RegExp(`^(?=.*${nombre})`, 'i')
            
            //filter.nombre = nombre
            filter.nombre = regex
            // console.log(regex)
        }

        if(is_public){
            filter.is_public = is_public
            // console.log(is_public)
        }
        
        if(is_member != null){
            const token = req.body.token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const user_id = decoded.id
            if(is_member){
                filter['miembros.usuarioId'] = user_id
            }else{
                filter['miembros.usuarioId'] = {$ne: user_id}
            }
        }
        console.log(filter)
        const communities = await Community.find(filter)
        res.status(200).json(communities)
    } catch (error) {
        res.status(500).json({message: 'Error al intentar realizar busqueda', error})
    }
}

exports.getCommunitiesbyUserId = async (req, res) => {
    try {
        // Recuperado de los cookies (usando middleware verifyToken)
        const user_id = req.user_id

        const communities = await Community.find({'miembros.usuarioId': user_id})

        res.status(200).json(communities)

    } catch (error) {
        res.status(500).json({message: 'Error al recuperar comunidades de usuario', error})
    }
}

exports.addUser = async (req, res) => {
    try {
        // Recuperado de los cookies (usando middleware verifyToken)
        const user_id = req.user_id
        const community_id = req.params.id

        const newMember = { usuarioId: user_id, rol: "Miembro" }

        //const community = await Community.findById(id)
        const community = await Community.findByIdAndUpdate(community_id,
            {$push: {miembros:newMember}},
            {
                new: true,
                runValidators: true
            })

        if(!community){
            return res.status(404).json({ message: 'Comunidad no encontrada'})
        }

        res.status(200).json(community);

    } catch (error) {
        res.status(500).json({message: 'Error al recuperar comunidades de usuario', error})
    }
}