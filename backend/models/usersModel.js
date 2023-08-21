// User Name
// profilePic
// Phone
// Email
// DOB
// Password

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userModel = mongoose.Schema(
    {
        userName : { 
            type : String,
            trim : true 
        },
        profilePic : {
            type : String,
            default : "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
        },
        phone : {
            type : String,
            trim : true,
            unique : true,
        },

        email : {
            type : String,
            unique : true,
            trim : true
        },

        DOB : {
            type : Date
        },

        password : {
            type : String
        }
    },
    {
        timestamps : true
    }

);

userModel.methods.matchPassword = async function(enteredPassword){
    const comparison = await bcrypt.compare(enteredPassword,this.password)
    return comparison;
}

userModel.pre('save',async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt) 
})

const Users = mongoose.model("Users", userModel)

module.exports = Users;