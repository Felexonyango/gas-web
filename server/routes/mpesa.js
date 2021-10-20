// mpesa payment
var express = require('express');
var router = express.Router();
const axios =require('axios')
const User = require("../model/UserModel");
const config = require("../confing")

const shortcode =config.SHORTCODE
const passkey = config.PASSKEY

const newPassword = () => {
  const dt = datetime.create();
  const formatted = dt.format('YmdHMS');

  const passString = shortcode + passkey + formatted;
  return {
      timestamp: formatted,
      password: Buffer.from(passString).toString('base64')
  };
}

router.get("/access_token",access,async(req,res)=>{
  try{
    res.status(200).json({access_token:req.access_token})
  }
  catch(error){
console.log(error)
  }
  
})
 //stk lipanampesa

router.post("/stk",access,async(req,res)=>{
  
  let auth="Bearer "+ req.access_token
   
    let url="https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  
    const {timestamp, password} = newPassword();
    const user = await User.find({email: req.session.email})

    const phone = `254${user[0].phone}`

   const data = {
    "BusinessShortCode": shortcode,
    "Password": password,
    "Timestamp": timestamp,
    "TransactionType": "CustomerBuyGoodsOnline",
    "Amount": "1",
    "PartyA": phone,
    "PartyB": shortcode,
    "PhoneNumber": phone,
    "CallBackURL": `https://amazon-cellular.com/orders/paying`,
    "AccountReference": "Amazon Cellular Live",
    "TransactionDesc": "Lipa na M-PESA"
}
 
axios.post(`${url}`, data, {
  method:"POST",
  headers : {
    "Authorization" : `${auth}`
  }
})
.then((res) => {
 res.status(200).json({msg:"success"})
})
.catch( (reason) => {
    
    reason.status(400).json({msg:"Error"})
    
})
})


async function access(){
  try {
    Key = "FxHU85k3WwHM999i7WehJdlcc9xpRjU8",
    Secret="cNC1wU7kfbjqM8Qr"
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = Buffer.from(`${Key}:${Secret}`).toString("base64");
    
      const res = await axios.get(`${url}`,{
        method:"POST",
        headers : {
          Authorization: `Basic ${auth}`,
          "content-type": "application/json"
        },
        json:{

          "Shortcode":shortcode,
          "ResponseType": "Completed",
          "ConfirmationURL": "http://197.248.86.122:801/confirmation",
          "ValidationURL": "http://197.248.86.122:801/validation",
      
        }
      });
      
      console.log(res.data);
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }

}
 module.exports = router;