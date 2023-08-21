const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()
const {createCommunityChat , propertyChange, CommunitySearch, addToGroup, removeFromGroup, showCommunity, showUserCommunity } = require("../controllers/communityControllers")


router.route('/create').post(protect,createCommunityChat)
router.route('/update').put(protect, propertyChange)
router.route('/').get(protect, CommunitySearch)
router.route('/groupAdd').put(protect,addToGroup)
router.route('/groupRemove').put(protect,removeFromGroup)
router.route('/cu').get(showCommunity)
// router.route('/').get(protect,fetchChats)

module.exports = router