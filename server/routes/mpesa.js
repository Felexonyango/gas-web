
const axios =require('axios')
var express =require('express')
const config = require("../confing");
const router = express.Router();
const shortcode =config.SHORTCODE
const passkey = config.PASSKEY

let date= new Date()
const Timestamp= date.getFullYear() +"" + date.getMonth()+""+ date.getDate()+""+date.getHours() +""+ date.getMinutes()
const Password= new Buffer.from(shortcode+passkey + Timestamp).toString('base64')

router.get("/access_token",access,async(req,res)=>{
  try{
    res.status(200).json({access_token:req.access_token})
  }
  catch(error){
console.log(error)
  }
  
})
 //stk lipanampesa

router.post('/stk', access,(req,res)=>{
  let auth=  req.access_token
const stkURL= "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
const data = {
  "BusinessShortCode": shortcode,
  "Password": Password,
  "Timestamp": Timestamp,
  "TransactionType": "CustomerBuyGoodsOnline",
  "Amount": "1",
  "PartyA": '254748793263',
  "PartyB": shortcode,
  "PhoneNumber": '254748793263',
  "CallBackURL": `https://amazon-cellular.com/orders/paying`,
  "AccountReference": "Amazon Cellular Live",
  "TransactionDesc": "Lipa na M-PESA"

};
axios
.post(stkURL,data,{
  method:"POST",
        headers : {
          Authorization: auth,
          "Content-type": "application/json"
        },

})
.then(response=>res.send(response.data))

})
function access(req,res){
  try {
    Key = "jQ6EnG1vGqegaXCXTkgscVAEkvPoJBLa",
    Secret="DmGYExqAXcsmAjVy"
    
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = Buffer.from(`${Key}:${Secret}`).toString("base64");
    
      axios.get(`${url}`,{
        method:"POST",
        headers : {
          Authorization: `Basic ${auth}`,
          "content-type": "application/json"
        }
      
      })
      .then(response=>res.send(response.data))
      
      
  } catch (err) {
     console.log(err)
  }

}
  

module.exports = router;