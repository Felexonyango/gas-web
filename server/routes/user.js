const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../model/UserModel')
const { generateToken} = require('../util');
const nodemailer = require("nodemailer");
const {API_KEY} =require('../confing')
const sendgridTransport =require('nodemailer-sendgrid-transport')
const crypto  =require('crypto')
const userRouter = express.Router();
const  transporter= nodemailer.createTransport(sendgridTransport({

    auth:{
        API_KEY:`${API_KEY}`
    }
}))


userRouter.get('/',async(req,res)=>{
    res.send("Gas api created")
})




// /api/users/register
userRouter.post('/register',(async (req, res) => {
    
    
    try{
        
        const salt = await bcrypt.genSalt(10);
        const password = await req.body.password
        const username = await req.body.username
        const email = await req.body.email
        const phone = await req.body.phone
        const user = new User({
            username:username,
            email:email,
            phone:phone,
            password: bcrypt.hashSync(password, salt)
        });
        // save new user in db
        const createdUser = await user.save()
        User.findOne({ email });

        // send user obj back
      return res.send({
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            phone:createdUser.phone,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
       


    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }


})
);


// /api/user/signin route 
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    try{

        const user = await User.findOne({ email: req.body.email});
        //check if there is user with given email
        if(user) {
            // use bcrypt to validate password
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    
                    email: user.email,
                    password:user.password,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                
                
            }
        }
    }
    catch(err){
       console.log(err.message)
          // 401 unauthorized 
    res.status(401).send({ message: 'Invalid email or password'});
    }
    
  
})
)
//reset password

userRouter.post("/reset-password",(req,res)=>{
crypto.randomBytes(32,(err,buffer)=>{
    if(err){
        console.log(err)
    }
    const token =buffer.toString("hex")
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return  res.status(500).json({error:"user does not exist with that email"})
        }
        user.resetToken=token;
        user.expireToken=Date.now() +36000000
        user.save()
        .then(result=>{
            transporter.sendMail({
                to:user.email,
                from:"no-replay@insta.com",
                subject:"password reset",
                html:`
                <p>You requested for password reset</P>
                <h5>click in this  <a href ="http://localhost:3000/reset${token}">link </a> to reset password </h5>
                <`
            })
             return res.json({message:"check your email"})
        })
        
        

    })
})

})

module.exports = userRouter;