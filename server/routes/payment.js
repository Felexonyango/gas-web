const { Router } = require('express');
const router = Router();
const {STRIPE_KEY} =require('../confing')

// Stripe
const stripe = require('stripe')(`${STRIPE_KEY}`);
router.post('/checkout', async (req, res) => {
	try{
	const  {customer_email} =req.body
    const session = await stripe.checkout.sessions.create({
		
		payment_method_types: ['card'],
		line_items: [
		  {
			price_data: {
			  currency: 'usd',
			  product_data: {
				  name:"okayo",
			  },
			  unit_amount:100
			},
			quantity:1,
		  },
		],
		mode: 'payment',
		success_url: "http://localhost:3000/success?session_id={CHECKOUT_ID}",
		cancel_url: "http://localhost:3000/cancelled",
		customer_email,
		shipping_address_collection:{allowed_countries:['US','GB']},
		billing_address_collection:'auto'
	  });
	  const sessionID = await stripe.checkout.sessions.retrieve(session.id);
	// console.log("session details", sessiondetails);
	  //res.status(200).json({sessionID:sessiondetails})
  res.status(200).json({sessionId:sessionID})
  
	}catch(error){

		console.log(error)
	}
  
});


 


module.exports = router;
