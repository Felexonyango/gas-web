import React from 'react'
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import Routes from './routes';
import setAuthToken from "./utils/setAuthToken";
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const stripePromise =loadStripe(`${process.env.React_stripe}`)
const App = () => {
    return ( 
        <HelmetProvider>
        <ProductsContextProvider>
          <CartContextProvider>
       <Elements stripe={stripePromise}>
       <Routes />
      
       </Elements>
          
          </CartContextProvider>
        </ProductsContextProvider>
      </HelmetProvider>

     );
}
 
export default App;