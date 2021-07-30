
import React,{useContext,Fragment,useEffect} from 'react';
import Layout from '../components/Layout'
import AuthContext from "../contexts/auth/authContext";
import { Link } from "react-router-dom"
const Subscription  = props => {
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
                <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quidem sequi at repellendus. Autem quas, impedit quibusdam perspiciatis eius debitis fugiat molestias earum deleniti saepe ipsam sequi molestiae praesentium doloribus!
        </p>
            
            </div>
            
        </div>
    </Layout>
     );
}
 
export default Subscription;