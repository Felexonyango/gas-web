import React, { useContext, useState } from 'react'
import {useStripe} from  '@stripe/react-stripe-js'
import { CartContext } from '../contexts/CartContext'

import Axios from 'axios'
import "./Checkou.styles.scss"
const StripeCheckout = () => {
    const [email,setEmail] =useState('')
    const {cartItems} =useContext(CartContext)
    const stripe =useStripe()
    const handlercheout = async(e)=>{
       e.preventDefault()
   const products=cartItems.map((product)=>{
       return{
        amount:product.price *100,
        description:product.description,
        currency:'usd',
        name:product.name,
        photo:product.photo,

       }
   })

   const response = await Axios.post('http://localhost:5000/api/payment/checkout',{

       body:{products,stripeEmail:email}
   })
   const {customerID} =response;
   const {error}= await stripe.redirectToCheckout({
       customerID
   })
   if(error){
       console.log(error)
   }

    }
   

    return (
        <form onSubmit={handlercheout}>
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