var dotenv =require('dotenv');
dotenv.config()
require('process')

 var config ={}; 

 config.DB=""+process.env.DB,
 config.JWT_SECRETE=""+process.env.JWT_SECRETE,
 config.STRIPE_KEY=""+process.env.STRIPE_KEY,
config. KEY=""+process.env.KEY,
config.SECRETE=""+process.env.SECRETE,


 module.exports =config