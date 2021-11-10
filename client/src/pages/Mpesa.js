import React,{useContext, useState} from 'react'
//import {CartContext} from '../contexts/CartContext'
import AuthContext from "../contexts/auth/authContext"
import {AlertContext} from "../contexts/alert/alertContext"
const Mpesa = () => {
    const authContext = useContext(AuthContext);
    //const {total}  =useContext(CartContext)
    const { setAlert } = useContext(AlertContext)
    
    const { pay} = authContext;

    const [Pay, setPay] = useState({
        amount: "",
        phone: ""
      });
    
      const { amount, phone } = Pay;
      const onChange = e => setPay({ ...Pay, [e.target.name]: e.target.value });
        pay({
         phone,
         amount
         
        });
        const onSubmit2 = e => {
            e.preventDefault();
            if (amount === "" ||phone==="") {
              setAlert("Please enter all fields", "danger");
            }
            
            else {
              pay({
               
                phone,
               amount
               
              });
            }
          };
    


  const [checkedTwo, setCheckedTwo] = useState(false);
 
  
 
  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  
 
   const onsubmit=(e)=>{
     e.preventDefauilt()
   }

    return (
        <div>
        <div className="pay">
            <h4>PAYMENT METHOD</h4>
            <br />
            <form onsubmit={onsubmit}>
            
          <br/>
      
          <label>
          <input 
            type="checkbox"
        value={checkedTwo}
        onChange={handleChangeTwo}
      />
     Lipa na M-PESA  (Have the phone with the registered safaricom number with you as after clicking the place order button a pop up will show on your phone asking you to pay to GAS STORE the specific amount of your order)

      </label>
 
      </form>
      </div>
      < br/>
      <div className='form-container'>
      <form onsubmit={onSubmit2}>
      <label htmlFor='phone'>phone</label>
          <input
            id='phone'
            type='phone'
            name='phone'
            placeholder="e.g 2547......"
            value={phone}
            onChange={onChange}
            required
            minLength='12'
          />
          <br />
         
           <input
            id='amount'
            type='amount'
            name='amount'
            placeholder="Amount"
            value={amount}
            onChange={onChange}
         
          />
          <br />
          <br />
          <input
          type='submit'
          value='PALCE ORDER'
          className='btn btn-primary btn-block'
        />
          
      </form>
        </div>
        </div>
        
    )
}
export default Mpesa;