const asyncHandler = require('express-async-handler')
const Messaging = require('../models/messagingModel')
const Community = require('../models/communityModel')
const Users = require('../models/usersModel')

const remover = asyncHandler(async function(req,res){
    try {
        var deleted = await Messaging.deleteMany({})
        deleted = await Community.deleteMany({})
        deleted = await Users.deleteMany({})
        res.status(200).json(deleted)
    } catch (error) {
        res.status(404)
        throw new Error(error)
    }
})

module.exports = remover