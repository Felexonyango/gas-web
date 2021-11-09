const { Router, response } = require("express");
const router = Router();
const axios =require('axios')
const config =require('../confing'); 
const datetime = require('node-datetime');
const {Checkout}=require("../controller/StripeController")
//stripe payments
router.post("/api/payment/checkout",Checkout)
const passkey = config.PASSKEY
const shortcode=config.SHORTCODE

const Key = config.CONSUMER_KEY
const Secret=config.CONSUMER_SECRETE

const newPassword = () => {
  const dt = datetime.create();
  const formatted = dt.format('YmdHMS');

    const passString = shortcode + passkey + formatted;
    return{

      timestamp: formatted,
      password: Buffer.from(passString).toString('base64')
    }
   
}


router.get("/api/payment/password",(req,res)=>{
    res.send(newPassword())

} )



function access(req,res,next){
    
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth =  Buffer.from(`${Key}:${Secret}`).toString("base64");
    
    axios.get( `${url}`,{
         
          headers : {
            Authorization: `Basic ${auth}`,
            "content-type": "application/json"
          }
        
    })
    .then(function (response) {

      req.access_token = response.data;
      
      
      next()
    
    })
    .catch(function (error) {
    
      console.log(error);
    })
  
  
  }
  
  router.post("/api/payment/stk",access,(req,res)=>{
    const {access_token} = req.access_token; 
    //res.send(access_token) 
    const {timestamp, password} = newPassword();
    const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const headers = {
       Authorization: `Bearer ${access_token}`,
       "content-type": "application/json"
  }
  
const data={
    "BusinessShortCode": "174379",
    "Password": password,
    "Timestamp": timestamp,
    "TransactionType": "CustomerBuyGoodsOnline",
    "Amount": "5",
    "PartyA": "254748793263",
    "PartyB": "174379",
    "PhoneNumber": "254748793263",
    "CallBackURL": "https://amazon-cellular.com/orders/paying",
    "AccountReference": "GAS WEB",
    "TransactionDesc": "Lipa na M-PESA"
}
axios.post(stkUrl, data, {headers:headers})
.then((response) => {
    res.send(response.data)
})

  })
module.exports = router;