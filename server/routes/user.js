const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../model/UserModel')
const data = require('../seeds/seed');
const { generateToken, isAuth } = require('../util');
const userRouter = express.Router();

userRouter.get('/',async(req,res)=>{
    res.send("Gas api created")
})




// /api/users/register
userRouter.post('/register', expressAsyncHandler(async ({body}, res) => {
    // console.log('register req.body:', body);
    try{
        
        const user = new User({
            username: body.username,
            email: body.email,
            phone:body.phone,
            password: bcrypt.hashSync(body.password, 8)
        });
        // save new user in db
        const createdUser = await user.save();
    
        // send user obj back
        res.send({
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            phone:createdUser.phone,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
        await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

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
    
                return;
            }
        }
    }
    catch(err){
       console.log(err.message)
          // 401 unauthorized 
    res.status(401).send({ message: 'Invalid email or password'});
    }
    
  
})
); 




// /api/users/profile
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    // console.log('req in user profile route', req);
    try{
        const user = await User.findById(req.user._id);
        if(user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            // if password is in req.body, hash password 
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }
    
            //save updated user info
            const updatedUser = await user.save();
            //send the updated user info back to the front end 
            res.send({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone:updatedUser.phone,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser)
            });

    }
   
    // use userId to get use info and then update
  
    }
    catch(err){
        console.log(err.message)
        res.status(500).send("Server Error");
    }
}));

// /api/users/details 
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    //get user info from User db
    try{

        const user = await User.findById(req.params.id);
        //send user obj backto front end if there is user 
        if(user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User Not Found'});
        }
    }
   catch(err){
   console.log(err.message)
   res.status(500).send("Server Error");
   }


}));


module.exports = userRouter;