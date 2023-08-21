const jwt = require("jsonwebtoken")

const generateToken = function(id){
    return jwt.sign({id}, process.env.JWT_KEY,{
        expiresIn : "30d"
    })
}

module.exports = generateToken