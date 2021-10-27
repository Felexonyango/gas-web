const { Router } = require("express");
const router = Router();
const {Index,Register,ResetPasssword,Login}   =require('../controller/userController')

//users routes
router.get("/api/users", Index);
router.post('/api/users/register',Register);
router.post('/api/users/login',Login)
router.post('/api/users/reset-password',ResetPasssword)






module.exports = router;