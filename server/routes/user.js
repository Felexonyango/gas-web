const User= require('../model/UserModel')
const { generateToken} = require('../util');
const nodemailer = require("nodemailer");
const {PASSWORD} =require('../confing');
const express =require('express')
const userRouter = express.Router();
const bcrypt =require('bcryptjs')
userRouter.get('/',async(req,res)=>{
    res.send("Gas api created")
})
// /api/users/register

userRouter.post('/register',async(req,res)=>{
    try {
      
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
        return res.send({
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            phone:createdUser.phone,
            token: generateToken(createdUser)
        });
        

    }
    catch (e) {
        console.log(e)
    }
})



// /api/user/signin route 
userRouter.post('/login', async (req, res) => {
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




//reset password

userRouter.post("/reset-password",async(req,res ,link)=>{
    try{
        const user = await User.findOne({ email: req.body.email});

    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'gasstore666@gmail.com',
                pass: `${PASSWORD}`
        }
    })

    const mailOptions = {
        from: '"GAS STORE 🛒" <gasstore666@gmail.com>',
        to: user.email,
        cc: ['felexonyango19@gmail.com'],
        subject: `RESETTING GAS STORE`,
        html: `
Dear ${user.username},
<br><br>
Click the link below to reset your password for Gas store. The link expires after 15 minutes and it's for a one time use. <br>
<a href="${link}">Reset my password</a>
<br>
If you did not initiate a forgot password request kindly report this incident by simply replying to this email or calling us on <a href="tel:+254748793253"> 0748793263</a>
<br><br>
Kind regards,<br>
Gas store
`,
    }

    const res =await transport.sendMail(mailOptions)
    return res;
    

}
catch (e) {
    console.log(e)
}
})




module.exports = userRouter;