const asyncHandler = require('express-async-handler')
const Messaging = require('../models/messagingModel')
const sendMessage = asyncHandler(async function(req,res){
    const { communityId, messageContent } = req.body
    console.log("Hlo");
    if(!messageContent || !communityId){
        console.log("Invalid Data passed into Request")
        return res.sendStatus(400)
    }

    var newMessage = {
        senderId : req.user._id,
        communityId : communityId,
        messageContent : messageContent
    }
    try{
        var message = await Messaging.create(newMessage)
        message = await message.populate({
            path : "senderId",
            select : "userName profilePic"
        })
        message = await message.populate({
            path : "communityId",
            select : "communityName participants"
        })
        res.status(201).json(message)

        }catch(err){
            res.status(404)
            throw new Error(error.message)
    }

})

const allMessages = asyncHandler(async function(req,res){
    try {
        const messages = await Messaging.find({ communityId : req.params.communityId }).populate({
            path : "senderId",
            select : "userName profilePic email"
        }).populate("communityId")

    if(messages){
        res.status(201).json(messages)
    }else{
        throw new Error("No messages found")
    }
    } catch (error) {
        console.error(error);
        res.status(400).json({error : error.message})
    }
})

module.exports = { sendMessage, allMessages }
