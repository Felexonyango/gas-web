import React, { useState, useContext, useEffect } from "react";
import {AlertContext} from "../../contexts/alert/alertContext"
import AuthContext from "../../contexts/auth/authContext"
import Layout from '../../components/Layout'
import {Link, useHistory} from 'react-router-dom'
const Register = ()=> {
  const history =useHistory()
  const authContext = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext)
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      
      history.push("/login");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const RedirectToLogin=(e)  =>{
       e.preventDefault()
       history.push('/login')

  }

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone:""
    
  });

  const { username, email, password, phone } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === "" || email === "" || password === ""||phone==="") {
      setAlert("Please enter all fields", "danger");
    }
    else {
      register({
        username,
        email,
        phone,
        password
       
      });
    }
  };

  return (
    <Layout >
      
 
    <div className='form-container'>
    <h1>
        Account <span className='text-primary'>REGISTER</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Username</label>
          <input
            id='name'
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
     
        <div className='form-group'>
          <label htmlFor='phone'>phone</label>
          <input
            id='phone'
            type='phone'
            name='phone'
            value={phone}
            onChange={onChange}
            required
            minLength='10'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
        
      </form>
      <div>
        <Link to="/login"onClick={RedirectToLogin}>Login</Link>
      </div>
    </div>
    </Layout>
  );
};

export default Register;
