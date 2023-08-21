// senderId
// communityId
//messages

const mongoose = require("mongoose")
const MessagingModel = mongoose.Schema(
    {
        senderId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users"
        },
        communityId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Community"
        },
        messageContent : {
            type : String
        }
    },
    {
        timestamps : true
    }
);

const Messaging = mongoose.model("Messaging", MessagingModel)

module.exports = Messaging;