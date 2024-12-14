const express = require('express')
const route = express.Router()
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')
const communityController = require('../controller/community.controller')
const channelController = require('../controller/channel.controller')
const messageController = require('../controller/message.controller')
const pollController = require('../controller/poll.controller')
const threadController = require('../controller/thread.controller')

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
route.put('/api/v1/community/:id', communityController.updateCommunity)
route.post('/api/v1/community', communityController.createCommunity)
route.post('/api/v1/communities/search', communityController.searchCommunity)
route.get('/api/v1/community/:id/add_user/:user_id', communityController.addUser)
route.get('/api/v1/community/:id/delete_user/:user_id', communityController.deleteUser)
route.get('/api/v1/delete_community/:id', communityController.deleteCommunity)

route.get('/api/v1/communities/myCommunities', communityController.getCommunitiesbyUserId)

//CHANNELS
route.get('/api/v1/channels/:comunidad_id', channelController.getAllChannels)
route.post('/api/v1/create_channel/:comunidad_id', channelController.createChannel)

//MENSAJES
route.get('/api/v1/messages/:canal_id', messageController.searchMessage)
route.get('/api/v2/messages/:canal_id', messageController.searchMessageV2)
route.post('/api/v1/:canal_id/create_message/:user_id', messageController.createMessage)

//POLLS
route.get('/api/v1/polls/:comunidad_id', pollController.getAllPolls)
route.post('/api/v1/poll/:id/create_poll/:user_id', pollController.createPoll)
route.post('/api/v1/poll/:poll_id/vote', pollController.voteOption)
route.put('/api/v1/poll/:id', pollController.updatePoll)

//HILOS
route.post('/api/v1/create_thread/:message_id', threadController.createThread)
route.get('/api/v1/threads/:canal_id', threadController.getAllThreadsFromChannel)
route.get('/api/v1/thread/:id', threadController.getThreadById)
route.put('/api/v1/thread/:id', threadController.updateThread)
route.get('/api/v1/thread/:thread_id/add_message/:message_id', threadController.addMessage)
route.delete('/api/v1/delete_thread/:id', threadController.deleteThread)

module.exports = route