const express = require('express')
const route = express.Router()
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')
const communityController = require('../controller/community.controller')
const channelController = require('../controller/channel.controller')
const messageController = require('../controller/message.controller')

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
route.post('/api/v1/community', verifyToken, communityController.createCommunity)
route.get('/api/v1/communities/search', verifyToken, communityController.searchCommunity)

route.get('/api/v1/communities/myCommunities', verifyToken, communityController.getCommunitiesbyUserId)

//CHANNELS
route.get('/api/v1/channels/:comunidad_id', verifyToken, channelController.getAllChannels)
route.post('/api/v1/channel/:comunidad_id', verifyToken, channelController.createChannel)

//MENSAJES
route.get('/api/v1/messages/:canal_id', verifyToken, messageController.searchMessage)
route.get('/api/v2/messages/:canal_id', messageController.searchMessageV2)
route.post('/api/v1/message/:canal_id', verifyToken, messageController.createMessage)

module.exports = route