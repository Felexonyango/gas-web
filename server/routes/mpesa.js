// mpesa payment



var express = require('express');
var router = express.Router();
const axios =require('axios')

router.get("/access_token",access,async(req,res)=>{
  try{
    res.status(200).json({access_token:req.access_token})
  }
  catch(error){
console.log(error)
  }
  
})


router.get("/register",access,async(req,res)=>{
try{
  let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  
  const auth = "Bearer" +req.access_token
 
const resp = await axios(`${url}`,{
  headers: {
    Authorization: `Basic ${auth}`,
    "content-type": "application/json"
  }

})

console.log(resp.data)

}
catch(error){
  console.log(error)
}
  
  
})
 //stk lipanampesa

router.get("/stk",access,async(req,res)=>{
  try{
    let url='https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    let auth="Bearer "+ req.access_token
    let date= new Date()
    const Timestamp= date.getFullYear() +"" + date.getMonth()+""+ date.getDate()+""+date.getHours() +""+ date.getMinutes()
    const Password= new Buffer.from("600113"+"	bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"+ Timestamp).toString('base64')
    
   const resp = await axios.get(`${url}`,{
    method:"POST",
    headers : {
      "Authorization" : `${auth}`
    },
    json:{
 
     "BusinessShortCode": "600113 ",
     "Password": Password,
     "Timestamp": Timestamp,
     "TransactionType": "CustomerPayBillOnline",
     "Amount": "1",
     "PartyA": "254748793263  ",
     "PartyB": "600113",
      "PhoneNumber": "254748793263",
     "CallBackUR": "https://onyango.com/stk_callback",
     "AccountReference": "345Demotest",
     "TransactionDesc": "activation "
    }
 
 })
 console.log(resp.data);

  } catch(error){
    console.log(error)

  }   


})

// function to access token from daraja to be consoled

async function access(){
  try {
    Key = "FxHU85k3WwHM999i7WehJdlcc9xpRjU8",
    Secret="cNC1wU7kfbjqM8Qr"
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = Buffer.from(`${Key}:${Secret}`).toString("base64");
    
      const resp = await axios.get(`${url}`,{
        method:"POST",
        headers : {
          Authorization: `Basic ${auth}`,
          "content-type": "application/json"
        },
        json:{

          "Shortcode":"600113",
          "ResponseType": "Completed",
          "ConfirmationURL": "http://197.248.86.122:801/confirmation",
          "ValidationURL": "http://197.248.86.122:801/validation",
      
        }
      });
      
      console.log(resp.data);
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};




 
 module.exports = router;
