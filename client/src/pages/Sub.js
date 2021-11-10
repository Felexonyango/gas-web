
import React,{useContext,Fragment} from 'react';
import Layout from '../components/Layout'
import AuthContext from "../contexts/auth/authContext";
import { Link } from "react-router-dom"

const  Sub = ()=> {
  const authContext = useContext(AuthContext);
 


  const { isAuthenticated, logout, user,loading } = authContext;

  const onLogout = () => {
    logout();
    
  };


  const authLinks = (

    <Fragment>
      <h6>Hello {user && user.username}</h6>
      <li>
        
     <Link to="/"onClick={onLogout} className='fas fa-sign-out-alt'>Logout</Link>
      
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>login</Link>
      </li>

      
    </ul>
      
    </Fragment>
  );
    return ( 
        <Layout title="Contact us" description=" welcome to subscription" >
        <div >
            <div className="text-center mt-5">
                <h1>Subscription</h1>
                <ul> {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}</ul>
              
            </div>
            <div>
            <Link to ='/recover'>Resetpassword</Link>
            </div>
            
        </div>
    </Layout>
     );
}
 
export default Sub