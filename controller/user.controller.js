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