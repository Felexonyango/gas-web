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
   const line_item=cartItems.map(product=>{
       return{
        quantity:product.quantity,
        price_data:{
            currency:'usd',
            unit_amount:product.price*100,
            product_data:{
                name:product.title,
                description:product.description,
                images:[
                    product.photo
                ],
            }
        }
       }
   })



   const response = await Axios.post('http://localhost:5000/api/payment/checkout',{

       body:{line_item,customer_email:email}
   })
   const {sessionId} =response;
   const {error}= await stripe.redirectToCheckout({
       sessionId
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