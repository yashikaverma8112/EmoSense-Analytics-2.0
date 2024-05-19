const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = "mhassdbbvbbvbdbvdndnduhuvnd";
const router = express.Router();
router.post('/signup',async(req,res) =>{
   const {name,email,password} = req.body;
   const hashedPassword = await bcryptjs.hash(password,10);
   const newUser = new User ({name,email,password: hashedPassword});
   try{
       await newUser.save();
       res.status(201).json({message:"User Added Successfully"})
    }
    catch(e){
        res.status(400).json({message:"Invalid credentials",error:e})

    }
})
router.post('/login',async (req, res) => {
  const { email, password } = req.body;
  try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
          return res.status(400).json({ message: "User not found" });
      }

      const validPassword = await bcryptjs.compare(password, validUser.password);
      if (!validPassword) {
          return res.status(400).json({ message: "Incorrect Password" });
      }

      const token = jwt.sign({ id: validUser._id }, jwtSecret);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now
      
      
      
      res.status(200).json({ authToken: token, ...rest });  
      
  } 
  catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
  }
});

router.put('/forgot-password/:email',async(req,res)=>{
    
  const { email } = req.params;
  const { password } = req.body;


  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.findOneAndUpdate({email}, {  $set: {password: hashedPassword}},  { new: true } );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
})


router.post('/signout',async (req, res, next) => {
  try {
    // res.clearCookie('access_token');
    let expires = new Date(0);
    res.cookie('access_token', '', { httpOnly: true, expires});
    res.setHeader("Set-Cookie", "access_token=; Max-Age=0; Path=/");
    res.status(200).json({authToken:'',message: "Signout successfully."});
  }
   catch (error) {
    next(error);
  }
});



module.exports = router;