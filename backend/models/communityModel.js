// Community Name
// image
// Creator
// Idea
// Exists For

const mongoose = require("mongoose")
const communityModel = mongoose.Schema(
    {
        communityName : {
            type : String,
            trim : true 
        },
        creator : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users"
        },

        idea : {
            type : String,
            trim : true
        },
        participants : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Users"
            },
        ],

    }, 
    {
        timestamps : true
    }
);

const Community = mongoose.model("Community", communityModel)

module.exports = Community;