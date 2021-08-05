
import React from 'react';
import Layout from '../components/Layout'

const About = () => {
    
    return ( 
        <Layout title="About us" >
        <div >
            
            <div className="text-center mt-5">
            <h1>ABOUT US</h1>
            <h4>We deliver gas cylinders  and  all there products </h4>
            <p>Gas store is an on-demand ordering and delivery service for your daily needs. Gas store was born out of a strong desire to make the lives of people easier. From peering through traffic to having multiple responsibilities at home and work, our lives have never been so complex. In such times Gas store is your convenience partner; working hard to simplify your life!

              Gas store gets your gas delivered at home, gets your favourite gas delivered instantly, and helps small retails,customers to access the gas cyliders in far flung places get their supplies conveniently. We simplify your life by taking over some of your most mundane but important tasks.</p>
         
          
         </div>
         <div className="text-center mt-5">

         <h1>CONTACT US </h1>

         </div>
      
      <div className='form-container'>
    
        <div className='form-group'>
          
          <input
            id='name'
            type='text'
            name='name'
            placeholder="name"

        
          />
        </div>
        <div className='form-group'>
        
          <input
            id='email'
            type='email'
            name='email'
            placeholder="Email"
          />
        </div>
       
       
          <input
            id='phone'
            type='phone'
            name='phone'
            placeholder="Phone"
          />
          <input
            id='password'
            type='password'
            name='password'
           placeholder="password"/>
        <input
          type='submit'
          value='submit'
          className='btn btn-primary btn-block'
        />
         
    </div>
            
        </div>
    </Layout>
     );
}
 
export default About