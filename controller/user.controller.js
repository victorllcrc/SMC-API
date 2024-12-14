const User = require('../models/user')

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    req.body.password = await User.encryptPassword(req.body.password)
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un nuevo usuario', error: error});
  }
}

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    
    if(req.body.password){
      req.body.password = await User.encryptPassword(req.body.password)
    }
    const updateUser = await User.findByIdAndUpdate(userId, req.body,{
      new: true,
      runValidators: true
    })
    
    if (!updateUser) {
      return res.status(404).json({ error: 'Usuario no encontrado'})
    }

    res.status(200).json( updateUser)

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error }); 
  }
}

exports.getUserById = async (req, res) =>{
  try {
    const userId = req.params.id

    const user = await User.findById(userId).select('-passsword')

    if(!user){
      return res.status(404).json({message: 'Usuario no encontrado'})
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message: 'Error al obtener al usuario', error: error})
  }
}
exports.changePassUser = async (req, res) => {
  try {
    const userId = req.params.id
    const currend_pass = req.body.currend_pass
    const new_pass = req.body.new_pass
    const confirm_pass = req.body.confirm_pass
    
    const userFound = await User.findOne({_id: userId})
    
    if (!userFound) return res.status(400).json({message: "User not found"})
    
    const macthPassword = await User.comparePassword(currend_pass, userFound.password)
    console.log(macthPassword)
    
    if (!macthPassword) return res.status(400).json({message: "Password incorrecto"})
    if (new_pass !== confirm_pass) return res.status(400).json({message: "Nueva contraseñas y Confirmar nueva contraseña no coincide"})
    
    if(new_pass === confirm_pass){
      userFound.password = await User.encryptPassword(new_pass)
      await userFound.save()
    }
    res.status(200).json({ message: "Contraseña actualizada exitosamente" })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar password del usuario', error: error });
  }
}