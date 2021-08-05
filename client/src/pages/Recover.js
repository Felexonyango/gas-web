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
    const [user, setUser] = useState({ email: "" });

      const { email } = user;
      const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });


      const onSubmit = e => {
        e.preventDefault();
        if (email === "") {
          setAlert("Please enter the field", "danger");
        }
         else {
          forgetpassword({
        
            email
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
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
            minLength='6'
          />
          </div>
          <input
          type='submit'
          value='submit'
          className='btn btn-primary btn-block'
        />
          </form>
       </div>
       
    </Layout>
    )
}

export  default Forgetpassword