const router= require('express').Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');


const JWT_SECRET=process.env.secretKey;
// create user using POST  "api/auth"
router.post('/createuser',
[
    body('name',"Enter a valid Name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"password length must be >5").isLength({min:5})
],
async(req,res)=>{
    // to return the error if any
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password,salt);
   await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    })
    .then(user=>{
        const data ={
            id:user.id
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        // console.log(authToken);
        success=true;
        res.json({success,authToken});
    })
    .catch(
        err=>{
            res.json({success,err:"Enter a valid info"});
         }
    );

})

// authenticate user
router.post('/login',
[
    body('email',"Enter a valid email").isEmail(),
    body('password',"password cant not be blank").exists()
],
async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"Login With correct credentials"});
        }
        const passCompare=await bcrypt.compare(password,user.password);
        if(!passCompare){
            return res.status(400).json({success,error:"Login With correct credentials"});
        }
        const data ={
            id:user.id
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        // console.log(authToken);
        success=true;
        res.json({success,authToken});
    }
    catch(err){
        res.json({success,err:"Enternal Server error"});
        
    }
})


// get user details 
router.post('/getuser',fetchuser, async(req,res)=>{
try{
 userId=req.user;
//  console.log(userId);
 const user=await User.findById(userId).select("-password");
 res.send(user);
}
catch(err){
    res.json({err:"Enternal Server error"});
}

})
 

module.exports =router