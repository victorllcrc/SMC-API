const jwt = require('jsonwebtoken') 
 
const decodeToken = (token) => {
    
    if (!token) return res.status(403).json({message: 'Token requerido'}) 

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY) 
        const user_id = decoded.id
        return user_id
    } catch (error) {
        return res.status(401).json({message: 'Token inválido', error}) 
    }
} 

module.exports = decodeToken