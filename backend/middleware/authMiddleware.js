const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel.js");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { // Check chatgpt it explains well
        try {
        token = req.headers.authorization.split(" ")[1];

        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log(decoded.id)
        // console.log(typeof(decoded.id));
        req.user = await Users.findById(decoded.id).select("-password"); // finds document by id and shows
                                                                        //  document excluding password field

        next();
        } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
