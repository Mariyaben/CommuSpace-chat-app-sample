const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DBConnection.js");
const userRoutes = require("./routes/userRoutes.js");
const communityRoutes = require("./routes/communityRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();
app.use(express.json()); // accept JSON file

dotenv.config(); // helps to read the env file
connectDB(); // IN config/db.js

app.get("/", function (req, res) {
  res.send("API is running");
});

app.use("/user", userRoutes);
app.use("/community", communityRoutes);
app.use("/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log("Server Started on PORT ", PORT));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Use http:// instead of https:// for WebSocket
  },
});

io.on("connection", function(socket) {
    console.log('connected to socket.io');
  
    // Listen for "message" event from the client
    socket.on("message", async function(data) {
      try {
        // Assuming you have a Message model or schema
        const newMessage = new Message({
          author: data.author,
          text: data.text,
          image: data.image,
          timestamp: new Date()
        });
  
        // Save the new message to the database
        await newMessage.save();
  
        // Emit the message to all connected clients
        io.emit("message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
  });
   // npm install socket.io-client
