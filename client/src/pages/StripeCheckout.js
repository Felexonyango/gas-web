import React, { useContext, useState } from 'react'
import {useStripe} from  '@stripe/react-stripe-js'
import { CartContext } from '../contexts/CartContext'
import Axios from 'axios'
import "./Checkou.styles.scss"
const StripeCheckout = () => {
    const [email,setEmail] =useState('')
  const {cartItems} =useContext(CartContext)
    const stripe =useStripe()

    const Handlercheckout = async(e)=>{
     e.preventDefault();
 const line_items= cartItems.map(item=>{
return{
 quantity:item.quantity,
 price_data: {
    currency: "usd",
    unit_amount: item.price*100,
    product_data: {
      name: item.name,
      description:item.description,
      images:[
          item.photo
      ]
    },
}

 }  
});
const res =  await Axios.post("http://localhost:5000/api/payment/checkout",{
 body:{line_items,customer_email:email}

})
const {sessionId} =res;
const{error}= await stripe.redirectToCheckout({
    sessionId
})
if(error){
    console.log(error)
}
}

    return (
        <form onSubmit={Handlercheckout}>
<div>
    <input
    type="email"
    onChange={(e)=>setEmail(e.target.value)}
    placeholder="Email"
    value={email}
    className="nomad-input">

    </input>

</div>
<div className="submit">
    <button 
    type="submit"
    className="button is-black">
        Checkout
    </button>
</div>


        </form>
    )
}

export  default StripeCheckout