const mongoose = require("mongoose");

mongoose.set('strictQuery',true)
const connectDB = async function(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        console.log('MonogDB Connection : ',conn.connection.host);
    } catch (err) {
        console.log("Error : ",err.message);
        process.exit()
    }
}

module.exports = connectDB