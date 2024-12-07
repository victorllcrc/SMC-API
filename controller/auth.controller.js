const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.singIn = async (req, res) => {
    try {
      const userFound = await User.findOne({email: req.body.email})
    
      if (!userFound) return res.status(400).json({message: "User not found"})
    
      const macthPassword = await User.comparePassword(req.body.password, userFound.password)
    
      if(!macthPassword) return res.status(401).json({token:null, message: "Invalid password" })
    
      const token = jwt.sign({id: userFound._id, name: `${userFound.nombre} ${userFound.apellidos}`, email:userFound.email},process.env.SECRET_KEY,{
        expiresIn:86400 //24horas
      })

      // Configurar cookies 
      res.cookie('authToken', token, {
        httpOnly: true,    
        sameSite: 'Strict',
        maxAge: 86400000   // 24 horas 
      })

      res.status(200).json({token})
      
    } catch (error) {
      res.status(500).json({ message: 'Error al crear token', error: error})
    }
}

exports.existCorreo = async (req, res) => {
    try {
        const userFound = await User.findOne({email: req.body.email})
        if (userFound) return res.status(200).json({message: "Ya existe usuario con este correo"})
        
        return res.status(200).json({message: "Correo valido"})
        
    } catch (error) {
        res.status(500).json({ message: 'Error al validar correo', error: error})
    }
}