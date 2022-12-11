const express = require("express");
const { registerUser, LoginUser, user } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");


const router =  express.Router();
 
router.post('/register', registerUser)
router.post('/login', LoginUser)
router.get('/', protect, user)



module.exports = router;