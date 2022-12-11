const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const { use } = require("../routes/goalsRoutes");
const { response } = require("express");


const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    
    if(!email || !name || !password){
        res.status(400);
        throw new Error("please enter all the fields")
    }

    const UserExist = await User.findOne({email})

    if(UserExist){
        res.status(400)
        throw new Error("User already exist")
    }

     const salt = await bcrypt.genSalt(10)
     const hasedPassword = await bcrypt.hash(password, salt)

     const user = await User.create({
        name, email,
        password: hasedPassword
     })

     if(user){
        res.status(201).json({
            // id: user.id,
            // name: user.name,
            // email: user.email,
            // password: user.password,
            token : generateToken(user.id)
        })
     } else {
        res.status(400)
        throw new Error("Invalid credentials");
     }


  
})
const LoginUser = asyncHandler( async(req, res) => {
    const { email , password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const user = await User.findOne({ email })

    const passwordCompared = await bcrypt.compare(password, user.password)

    if(user && passwordCompared){
        res.status(200).json({
            // id: user.id,
            // email: user.email,
            // name: user.name,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

        
  
})
const user = asyncHandler( async(req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id, name, email 
    })
})


// GENERATE JWT TOKEN 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '20d'
    })
}


module.exports = {
    registerUser, LoginUser, user
}