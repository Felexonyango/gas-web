var dotenv =require('dotenv');
dotenv.config()
require('process')

 var config ={}; 

 config.DB=""+process.env.DB,
 config.JWT_SECRETE=""+process.env.JWT_SECRETE,
 config.STRIPE_KEY=""+process.env.STRIPE_KEY,

config.API_KEY=""+process.env.API_KEY,
config.SHORTCODE= ""+process.env.SHORTCODE,
config. PASSKEY=""+process.env.PASSKEY,
config.CONSUMER_KEY=""+process.env.CONSUMER_KEY,
config.CONSUMER_SECRETE=""+process.env.CONSUMER_SECRETE,

 module.exports =config