const { Router } = require('express');
const router = Router();
const {STRIPE_KEY} =require('../confing')


// Stripe
const stripe = require('stripe')(`${STRIPE_KEY}`);



router.post('/checkout', async (req, res) => {
    try{
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount:100,
        description:"good",
        currency: 'usd',
        customer: customer.id
    });
   
    res.status(200).json({chargeID:charge.id })
    
    }
    catch(error){
        console.log(error)
 return res.status(400).json({error:"Cannot charge a customer that has no active card"})
    }
});


module.exports = router;
