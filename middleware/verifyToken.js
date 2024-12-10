const jwt = require('jsonwebtoken') 
 
const verifyToken = (req, res, next) => {
    // Se lee el token del cookie
    // const token = req.cookies.authToken  (en despliegue)
    const token = req.headers.cookie.split('=')[1] // POSTMAN

    if (!token) return res.status(403).json({message: 'Token requerido'}) 

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY) 
        // Añadir información proveniente del token a la solicitud
        req.user_id = decoded.id
        req.username = decoded.username
        next() 
    } catch (error) {
        res.status(401).json({message: 'Token inválido', error}) 
    }
} 

module.exports = verifyToken
