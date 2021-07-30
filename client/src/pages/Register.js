import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../contexts/alert/alertContext"
import AuthContext from "../contexts/auth/authContext"
import { Link } from "react-router-dom";
import Layout from '../components/Layout'
const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/subscription");
    }
    

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
  });

  const { name, email,phone, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" ||  email === "" || phone==="" || password === "") {
      setAlert("Please enter all fields", "danger");
    }
     else {
      register({
        name,
        email,
        phone,
        password
      });
    }
  };
  const redirectToLogin = () => {
  
    props.history.push('/login'); 
}

  return (
    <Layout>  
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
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
          <label htmlFor='phone'>Phone number</label>
          <input
            id='phone'
            type='phone'
            name='phone'
            value={phone}
            onChange={onChange}
            required
            minLength='12'
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
      <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}><Link to ="/login" className="login">LOGIN</Link></span> 
            </div>      
    </div>
    </Layout>
  );
};

export default Register;
