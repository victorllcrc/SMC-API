const User = require('../models/user')

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    // const data_user = {
    //   nombre:req.body.nombre,
    //   apellidos:req.body.apellidos,
    //   email:req.body.email,
    //   password: await User.encryptPassword(req.body.password),
    //   ciclo_estudio:req.body.ciclo_estudio,
    //   carrera:req.body.carrera,
    // }
    req.body.password= await User.encryptPassword(req.body.password)
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear un nuevo usuario', error: error});
  }
}

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };