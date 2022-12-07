const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//register new user:
router.post("/register", async (req, res) => {
  try {
    //if existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({
      message: "User created successfully..",
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error: " + err,
      success: false,
      data:null
    });
  }
});

//login user
router.post("/login",async(req,res)=>{
  try{
    const userExists=await User.findOne({email:req.body.email});
    if(!userExists){
      return res.send({
        message:"user does not exist",
        success:false,
      })
    }
    //compare password with hashed password
    const passwordMatch=await bcrypt.compare(req.body.password,userExists.password);
    if(!passwordMatch){
      return res.send({
        message:"Incorrect password",
        success:false,
        data:null
      })
    }
    
    const token=jwt.sign({userId:userExists._id},process.env.jwt_secret,{
      expiresIn:"1d"
    })

    return res.send({
      success:true,
      message:" user Logged in successfully",
      data:token,
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).send({
      message:"Error: " + err,
      success:false,
    })

  }
})

// get user by id
//we are getting token from the frontend
//we are sending only the token ..we dont know what is the userid.so we have to decrypt the token and we have to get the userid.
//for sending the token middlewares-->authMiddlewares.js

module.exports = router;
