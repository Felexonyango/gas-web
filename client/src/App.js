import React,{useEffect,useContext} from 'react'
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import Routes from './routes';
import setAuthToken from "./utils/setAuthToken";
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import "./App.css";
import AuthState from './contexts/auth/AuthState'
import AlertState from './contexts/alert/AlertState'
import AuthContext from "./contexts/auth/authContext"




const stripePromise =loadStripe(`${process.env.React_stripe}`)
const App = () => {
  const authContext = useContext(AuthContext);


  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      authContext.loadUser();
    } else{
      
    }


  })
 
    return ( 
      <AuthState>
        <AlertState>
        <HelmetProvider>
        <ProductsContextProvider>
          <CartContextProvider>
       <Elements stripe={stripePromise}>
       <Routes />
      
       </Elements>
          
          </CartContextProvider>
        </ProductsContextProvider>
      </HelmetProvider>
      </AlertState>
      </AuthState>

     );
}
 
export default App;