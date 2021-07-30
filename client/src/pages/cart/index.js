import React, { useContext } from 'react';
import Layout from '../../components/Layout';

import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';

import {  withRouter } from 'react-router-dom';
import Total from '../Total';

const Cart = () => {

    const {  cartItems } = useContext(CartContext);
    
    return ( 
        <Layout >
            <div >

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                     
                    </div>
                <Total/>
                    
                </div>
            </div>
        </Layout>
     );
}
 
export default withRouter(Cart)