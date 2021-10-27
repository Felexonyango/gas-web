const datetime = require('node-datetime');
const axios = require('axios');
const {SHORTCODE,CONSUMER_KEY,PASSKEY, CONSUMER_SECRETE} =require('../confing')
const shortcode = SHORTCODE
const passkey = PASSKEY
const consumerKey = CONSUMER_KEY
const consumerSecret = CONSUMER_SECRETE

const newPassword = () => {
    const dt = datetime.create();
    const formatted = dt.format('YmdHMS');

    const passString = shortcode + passkey + formatted;
    return {
        timestamp: formatted,
        password: Buffer.from(passString).toString('base64')
    };
}

const accessToken = (req, res, next) => {
    const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth = "Basic " + Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");
    const headers = {
        Authorization: auth
    }

    axios.get(url, {headers})
        .then(response => {
            req.access_token = response.data;
            next()
        })
        .catch(reason => console.log(reason));
}

const stkPush = async (req, res) => {
    const {access_token} = req.access_token;

    const headers = {
        Authorization: 'Bearer ' + access_token
    }

    const stkUrl = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const {timestamp, password} = newPassword();

   
    const data = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerBuyGoodsOnline",
        "Amount": "1",
        "PartyA": "254748793263",
        "PartyB": shortcode,
        "PhoneNumber": "254748793263",
        "CallBackURL": `https://amazon-cellular.com/orders/paying`,
        "AccountReference": "Amazon Cellular Live",
        "TransactionDesc": "Lipa na M-PESA"
    }

    axios.post(stkUrl, data, {headers})
        .then((response) => {
            res.send(response.data)
        })
       
}
module.exports={accessToken,stkPush}