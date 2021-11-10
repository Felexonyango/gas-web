require('dotenv').config();
const datetime = require('node-datetime');
const axios = require('axios');
const User =require('../model/UserModel')
const { response } = require('express');
const passKey = process.env.PASSKEY;
const shortCode = process.env.SHORTCODE;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRETE;

const newPassword =  (req,res) => {
    const dt = datetime.create();
    const formarted = dt.format('YmdHMS');

    const passString = shortCode + passKey + formarted;

    const base64Encodedpassword = Buffer.from(passString).toString('base64');

    return base64Encodedpassword;
};

const mpesaPassword = (req,res) => {

    res.send(newPassword());

};

const token = (req,res,next) => {
  
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    const headers = {
        Authorization:auth,
    };
    
    axios
    .get(url,{
        headers:headers,
    })
    .then((response) => {
        let data =response.data;
        let access_token =data.access_token;
        req.token = access_token;
       
        next();

    })
    .catch((error) => console.log(error));

};

const stkPush = async(req,res) => {
    try{
        const token = req.token;
        res.send(token);
        const dt = datetime.create();
        const formarted = dt.format('YmdHMS');
       
        const phone = req.body.phone
        const amount =req.body.amount
        const user = new User({ phone:phone, amount:amount})
       
        const headers = {
           Authorization: 'Bearer ' + token,
        };
       
        const stkUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        const data = {
           BusinessShortCode:shortCode,
           Password: newPassword(),
           Timestamp:formarted,
           TransactionType: "CustomerPayBillOnline",
           Amount: user.amount,
           PartyA: user.phone,
           PartyB: 174379,
           PhoneNumber: user.phone,
           CallBackURL: "https://mydomain.com/path",
           AccountReference: "GAS STORE",
           TransactionDesc: "LIPA NA MPESA" 
         };
       
        const response= await  axios.post(stkUrl,data,{headers:headers})
       
        return response.data
    }
    catch(err){
        console.log(err)

    }
    
 
};

module.exports = {
    newPassword,
    mpesaPassword,
    token,
    stkPush,
    
   
};