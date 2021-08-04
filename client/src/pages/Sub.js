
import React,{useContext,Fragment,useEffect} from 'react';
import Layout from '../components/Layout'
import AuthContext from "../contexts/auth/authContext";
import { Link } from "react-router-dom"
const  Sub = ()=> {
  const authContext = useContext(AuthContext);
 
 useEffect(()=>{

  authContext.loadUser();
 })
    

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    
  };


  const authLinks = (

    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'> LOGOUT</Link>
      </li>
      
    </Fragment>
  );
    return ( 
        <Layout title="Contact us" description=" welcome to subscription" >
        <div >
            <div className="text-center mt-5">
                <h1>Subscription</h1>
                <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
              
            </div>
            <div>
            <Link to ='/recover'>resetpassword</Link>
            </div>
            
        </div>
    </Layout>
     );
}
 
export default Sub