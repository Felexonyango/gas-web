const { Router } = require('express');
const router = Router();
const {STRIPE_KEY} =require('../confing')
const domainURL="http://localhost:3000"

// Stripe
const stripe = require('stripe')(`${STRIPE_KEY}`);


router.post('/checkout', async (req, res) => {
    
    const {line_items,customer_email}=req.body

    const  session= await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        line_items,
        customer_email,
        success_url:`${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${domainURL}/canceled`,
        shipping_address_collection:{allowed_countries:['US','GB']},
      
        })
        res.status(200).json({sessionID:session.id})
});

module.exports = router;
//needs changes on line payments