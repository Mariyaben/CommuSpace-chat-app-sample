const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async function(req,res) {
    console.log("YOu are at backend")
    const {userName,proPic,phone,email,DOB,password} = (req.body) // initializing the req.body values
    const values = req.body                                  // to the array of variables
    console.log(values)
    console.log("hi");
    if(!userName || !phone || !email || !DOB || !password){
        res.status(400)
        throw new Error("Please enter all the Feilds")
    }
    const userExists = await Users.findOne({$or: [{email: email}, {phone: phone}]})
    // Checking whether the user exists in the db

    if(userExists){ 
        res.status(400)
        throw new Error("User already exists")
    }
    
    const user = await Users.create({
        userName : userName,
        profilePic : proPic,
        phone : phone,
        email : email,
        DOB : DOB,
        password : password,
        
    })
    if(user){
        res.status(201).json({
            _id : user._id,
            userName : user.userName,
            profilePic : user.proPic,
            phone : user.phone,
            email : user.email,
            DOB : user.DOB,
            password : user.password,
            token : generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Failed to Create New User")
    }
})

////////////////////////////////////////////////////////////////////////

const authUser = asyncHandler(async function(req,res){
    const {email, password} = req.body
    const user = await Users.findOne({$or: [{email: email}, {phone: email}]}) //email variable is given at phone
                                                                // coz we allow the phone number login

    if(user && await user.matchPassword(password)){
        res.json({
            _id : user._id,
            userName : user.userName,
            profilePic : user.proPic,
            phone : user.phone,
            email : user.email,
            DOB : user.DOB,
            password : user.password,
            token : generateToken(user._id),
        })
    }
})

////////////////////////////////////////////////////////////////////////

// /user?search = abhishek
const allUsers = asyncHandler(async function(req,res){
    const keyword = req.query.search ?{
        $or : [
            { userName : {$regex : req.query.search, $options : "i"}}
        ],
    }
    :{}
    // The above is a condition for searching users the ? is a kind of condition like 
    // This same code in simple if else form :-

    // let keyword = {};
    // if (req.query.search) {
    //     keyword = {
    //         $or: [
    //         { userName: { $regex: req.query.search, $options: "i" } }
    //         ]    
    //     };
    // }
    console.log(keyword);
    const users = await Users.find(keyword).find({$ne : req.user._id})
    // The above is a chained find in which first find gives data filtered
    // by keyword next filter from the first filtered data
    res.send(users)
})

module.exports = {registerUser, authUser, allUsers}