import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
    faFacebook,
    faTelegram,
    faTwitter,
  
  } from "@fortawesome/free-brands-svg-icons";
const Contact = () => {
    return (
        <div className="Social-container">
               <h4>CONTACT US </h4>
               <a href="https://www.facebook.com/Felex/"
  className="facebook social">
  <FontAwesomeIcon icon={faFacebook} size="2x" />
</a>
<a href="https://www.twitter.com/Felex" className="twitter social">
  <FontAwesomeIcon icon={faTwitter} size="2x" />
</a>
<a href="https://www.telegram.com/Felex" className="twitter social">
  <FontAwesomeIcon icon={faTelegram} size="2x" />
</a>
              
        </div>
    )
}

export default Contact
