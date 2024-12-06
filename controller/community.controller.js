const Community = require('../models/community')

exports.getAllCommunities = async (req, res) =>{
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
            res.status(404).json({ messasge: 'Comunidad no encontrado'})
        }
        res.status(200).json(community)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener Comunidad'})
    }
}

exports.createCommunity = async (req, res)=>{
    try {
        const newCommunity = new Community(req.body)
        const community = await newCommunity.save()
        res.status(201).json(community)
    } catch (error) {
        res.status(500).json({message: 'Error al intentar crear comunidad', error})
    }
}

exports.searchCommunity = async (req, res) => {
    try {
        const nombre  = req.query.nombre
        const is_public  = req.query.is_public

        const filter = {}
        
        if(nombre){
            const regex = new RegExp(`^(?=.*${nombre})`, 'i')
            
            //filter.nombre = nombre
            filter.nombre = regex
            console.log(regex)
        }

        if(is_public){
            filter.is_public = is_public
            console.log(is_public)
        }
        console.log(filter)

        const communities = await Community.find(filter)
        res.status(200).json(communities)
    } catch (error) {
        res.status(500).json({message: 'Error al intentar realizar busqueda', error})
    }
}

// const getCommunitiesbyUserId = async (req, res) => {
//     try {
//         // Recuperado de los cookies (usando middleware verifyToken)
//         const user_id = req.user_id

//         const communities = await Community.find()

//     } catch (error) {
//         res.status(500).json({message: 'Error al recuperar comunidades de usuario', error})
//     }
// }