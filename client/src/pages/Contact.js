import React,{useContext,useState} from 'react'
import Layout from '../components/Layout'
import {AlertContext} from "../contexts/alert/alertContext"
import AuthContext from "../contexts/auth/authContext"
import "../pages/Home.css"
const Forgetpassword = () => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const {forgetpassword} = authContext;
    const [user, setUser] = useState({ resetpassword: "" });

      const { resetpassword } = user;
      const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });


      const onSubmit = e => {
        e.preventDefault();
        if (resetpassword === "") {
          setAlert("Please enter the field", "danger");
        }
         else {
          forgetpassword({
        
            resetpassword
          });
        }
      };

    return (
        <Layout title="recover">
       
          
    <div className='form-container'>
             
          <form onSubmit={onSubmit}>

              <div className='form-group'>
          <label htmlFor='password'>Reset-Password</label>
          <input
            id='password'
            type='password'
            name='resetpassword'
            value={resetpassword}
            onChange={onChange}
            required
            minLength='6'
          />
          </div>
          <input
          type='submit'
          value='Resetpassword'
          className='btn btn-primary btn-block'
        />
          </form>
       </div>
       
    </Layout>
    )
}

export  default Forgetpassword