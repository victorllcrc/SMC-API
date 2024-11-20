const express = require('express')
const route = express.Router()
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')

// USERS
route.post('/api/v1/users', userController.createUser)
route.get('/api/v1/users', userController.getUsers)

//LOGIN
route.post('/api/v1/singin', authController.singIn)
route.post('/api/v1/singup/exist_correo', authController.existCorreo)

module.exports = route