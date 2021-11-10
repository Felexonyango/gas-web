
import React,{useContext} from 'react';
import Layout from  '../components/Layout'
import {CartContext} from '../contexts/CartContext'
import "./Checkou.styles.scss"
import Mpesa from './Mpesa';
const Checkout = () => {
    const {itemCount,total}  =useContext(CartContext)
    
    return ( 
        <Layout >
        <div className="checkout" >
        <h3>{`Total Items:${itemCount}`}</h3>
             <h4>{`Total amount  :${total}`}</h4>
           <Mpesa/>
           
           
        </div>
    </Layout>
     );
}
 
export default Checkout