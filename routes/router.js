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
route.put('/api/v1/user/:id/change_pass', userController.changePassUser)

//LOGIN
route.post('/api/v1/singin', authController.singIn)
route.post('/api/v1/singup/exist_correo', authController.existCorreo)

//COMMUNITY
route.get('/api/v1/communities', communityController.getAllCommunities)
route.get('/api/v1/community/:id', communityController.getCommunityById)
route.post('/api/v1/community', communityController.createCommunity)
route.post('/api/v1/communities/search', communityController.searchCommunity)
route.get('/api/v1/community/:id/add_user/:user_id', communityController.addUser)


route.get('/api/v1/communities/myCommunities', communityController.getCommunitiesbyUserId)

//CHANNELS
route.get('/api/v1/channels/:comunidad_id', channelController.getAllChannels)
route.post('/api/v1/create_channel/:comunidad_id', channelController.createChannel)

//MENSAJES
route.get('/api/v1/messages/:canal_id', messageController.searchMessage)
route.get('/api/v2/messages/:canal_id', messageController.searchMessageV2)
route.post('/api/v1/create_message/:canal_id', messageController.createMessage)

module.exports = route