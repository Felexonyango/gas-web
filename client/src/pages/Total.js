
import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { withRouter } from 'react-router';
import {CartContext} from '../contexts/CartContext'
import { formatNumber } from '../helpers/utils'

const Total = () => {
    const { total,  itemCount, clearCart } = useContext(CartContext);
    

    let history = useHistory();

    function handleClick() {
    
      history.push("/checkout");
    }
  

    return ( 
        <div className="col-sm-3 p-3">
        <div className="card card-body">
            <p className="mb-1">Total Items</p>
            <h4 className=" mb-3 txt-right">{itemCount}</h4>
            <p className="mb-1">Total Payment</p>
            <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
            <hr className="my-4"/>
            <div className="text-center">
                
                <button type="button" className="btn btn-primary mb-2" onClick={handleClick}>CHECKOUT</button>
                <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
            </div>

        </div>
    </div>

    )
}
 
export default withRouter(Total)