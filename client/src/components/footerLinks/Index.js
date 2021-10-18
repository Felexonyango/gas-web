import React from 'react'
import { Link } from "react-router-dom";

const Index = () => {

    return (
        <div className="Link">
            <h4> QUick Links </h4>
      <ul>
         <li><Link to='/'>HOME</Link></li>
         <li> 
            <Link to ='/order'>ORDER NOW</Link>
             </li>
         <li> <Link to ="/about" >OUR STORY </Link> </li>
         <li><Link to ="/contact">CONTACT US</Link> </li>

         <li>
            <Link to ='/register'>SIGN IN</Link> </li>
            <li>   <Link to='/cart'>cart</Link></li>
     </ul>
  



                
        
         
         
        </div>
    )
}

export default Index
