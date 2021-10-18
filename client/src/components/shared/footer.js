import React from 'react';
import Contact from '../footerLinks/Contact';
import "../footerLinks/footer.css"
import Index from '../footerLinks/Index';

const Footer = () => {
    return ( 
        <div className="footer">
        <footer>
      <div className ="Links">
      <Index/>
          </div>
        
          <div className="contact">
              <Contact/>
              </div>
              <div className="copyright"> 
        <p>2021 &copy;-Present.All rights preserved  privacy policy  Terms of service  </p> 
         
            </div>


          
      
        </footer>
        </div>
     );
}
 
export default Footer;