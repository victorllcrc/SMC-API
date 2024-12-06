const express = require('express')
const route = express.Router()
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')
const communityController = require('../controller/community.controller')

// USERS
route.post('/api/v1/users', userController.createUser)
route.get('/api/v1/users', userController.getAllUsers)
route.get('/api/v1/user/:id', userController.getUserById)
route.put('/api/v1/user/:id', userController.updateUser)

//LOGIN
route.post('/api/v1/singin', authController.singIn)
route.post('/api/v1/singup/exist_correo', authController.existCorreo)

//COMMUNITY
route.get('/api/v1/communities', communityController.getAllCommunities)
route.get('/api/v1/community/:id', communityController.getCommunityById)
route.post('/api/v1/community', communityController.createCommunity)
route.get('/api/v1/communities/search', verifyToken, communityController.searchCommunity)

// route.get('/api/v1/community/myCommunities', verifyToken, communityController.getCommunitiesbyUserId)

module.exports = route