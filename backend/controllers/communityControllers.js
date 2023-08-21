const asyncHandler = require("express-async-handler");
const Community = require("../models/communityModel");
const Users = require("../models/usersModel");

const createCommunityChat = asyncHandler(async (req, res) => {
  if (!req.body.communityName || !req.body.idea) {
    return res.status(400).json({ message: "Please fill important fields" });
  }

  let participantUsers
  try{
      participantUsers = await Users.find({_id: {$in: req.body.users}},{password : 0})
  }catch(e){
      console.error(e);
  }
  console.log(req.user);
  participantUsers.push(req.user)
  console.log("Result : ",participantUsers);

  try {
    const addCommunity = await Community.create({
      communityName: req.body.communityName,
      creator :  req.user._id,
      idea: req.body.idea,
      participants : participantUsers
    });

    if (addCommunity) {
      res.status(201).json({ 
        
        _id : addCommunity._id,
        communityName : addCommunity.communityName,
        creator :  addCommunity.creator,
        idea : addCommunity.idea,
        participants : addCommunity.participants
        });
    } else {
      res.status(400).json({ message: "Failed to create the community" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const propertyChange = asyncHandler(async function(req, res){
    const { communityId, newName, newIdea, newLogo} = req.body

    const updates = {}
    if (newName) {
        updates.communityName = newName
    }
    if (newIdea) {
        updates.idea = newIdea
    }
    if (newLogo) {
        updates.communityLogo = newLogo
    }
    console.log(updates);
    const updateChat = await Community.findByIdAndUpdate({_id : communityId},updates,{
        new : true
    })
    if(updateChat){
        res.json(updateChat)
    }else{
        res.status(400) 
        err = new Error("Failed to Rename the Community")
        throw err
    }
})

const CommunitySearch = asyncHandler(async function(req,res){
    const keyword = req.query.search ?{
        $or : [
            { communityName : {$regex : req.query.search, $options : "i"}}
        ],
    }
    :{}
    const communities = await Community.find(keyword)
    res.status(200).json(communities)
})

const addToGroup = asyncHandler(async function(req,res){

    const { communityId, userId } = req.body
    const newUser = await Users.findById({_id : userId}).select("-password" )
    console.log("Hlo");
    const added = await Community.findByIdAndUpdate({_id : communityId},
        {$push : {participants : newUser}},
        {new : true}
    )
    console.log("Hlo");
    if(added) {
        res.status(201).json(added)
    }else{
        res.status(201)
        throw new Error("Participant addition failed")
    }
})

const removeFromGroup = asyncHandler(async function(req,res){

    const { communityId, userId } = req.body
    const removeUser = await Users.findById({_id : userId}).select("-password" )
    console.log("Hlo");
    console.log(removeUser)
    const removed = await Community.findByIdAndUpdate({_id : communityId},
        {$pull : {participants : { $in: [removeUser] }}},
        {new : true}
    )
    console.log("Hlo");
    if(removed) {
        console.log("removal Successful")
        res.status(201).json(removed)
    }else{
        res.status(201)
        throw new Error("Participant removal failed")
    }
})

const showCommunity = asyncHandler(async function(req,res){
    const communities = await Community.find()
    res.status(201).json(communities)
})

const getUserCommunities = async () => {
    try {
      const response = await axios.get('/community/user'); // Adjust the API endpoint
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  

const showUserCommunity = asyncHandler(async function(req, res) {
    try {
        const userId = req.user._id ;
        const community = await Community.find({ participants: userId });
        res.status(200).json(community);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});
module.exports = {createCommunityChat, propertyChange, CommunitySearch, addToGroup, removeFromGroup,showUserCommunity, showCommunity,}