const express = require("express")
const router =  express.Router()
const { registerUser ,authUser, allUsers} = require("../controllers/userControllers")
const { protect } = require("../middleware/authMiddleware")

router.post('/',registerUser)
router.get('/' ,protect,allUsers) // Route for /user/ post and get
router.post('/login',authUser) // Route for /user/login/ post and get
router.get('/info', protect, async (req, res) => {
    try {
      // The user's information is available in req.user (from the protect middleware)
      const user = req.user;
  
      res.json({
        _id: user._id,
        userName: user.userName,
        // ... (other properties)
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;