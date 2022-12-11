const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;
     console.log("req", req.headers.authorization.startsWith("Bearer"))
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      /// GET THE TOKEN FROM HEADER
      token = req.headers.authorization.split(' ')[1];
       console.log("token", req.headers.authorization.split('')[1])
      // VERIFY THE TOKEN
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode", decode)
      // GET USER FROM THE TOKEN
      req.user = await User.findById(decode.id).select("-password");
      console.log("SSSSSSSSSS>>>>>>>>>>>")
      next();
    } catch (error) {
      console.log("err at protected route", error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { protect };
