
import React,{useContext} from 'react';
import Layout from  '../components/Layout'
import {CartContext} from '../contexts/CartContext'
import "./Checkou.styles.scss"
import StripeCheckout from './StripeCheckout'
const Checkout = () => {
    const {itemCount,total}  =useContext(CartContext)
    
    return ( 
        <Layout >
        <div className="checkout" >
            <h2>Checkout summary</h2>
             <h3>{`Total Items:${itemCount}`}</h3>
             <h4>{`Amount to pay :${total}`}</h4>
             <StripeCheckout/>
        </div>
    </Layout>
     );
}
 
export default Checkout