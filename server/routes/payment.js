const { Router } = require("express");
const router = Router();

const {stkPush,accessToken}=require('../controller/mpesaController')
const {Checkout}=require("../controller/StripeController")
//mpesa routes
router.get("/api/payment/access_token", accessToken);
router.post('/api/payment/stk',stkPush);


//stripe payments
router.post("/api/payment/checkout",Checkout)


module.exports = router;