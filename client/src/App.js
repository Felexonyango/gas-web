import React from 'react'
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import Routes from './routes';
import "./App.css";
import AuthState from './contexts/auth/AuthState'
import AlertState from './contexts/alert/AlertState'
const App = () => {
 
    return ( 
      <AuthState>
        <AlertState>
        <HelmetProvider>
        <ProductsContextProvider>
          <CartContextProvider>
       <Routes />
          </CartContextProvider>
        </ProductsContextProvider>
      </HelmetProvider>
      </AlertState>
      </AuthState>

     );
}
 
export default App;