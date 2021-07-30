
import React from 'react'
import Layout from '../components/Layout'
import Image from '../assets/img2.jpeg';

import "../pages/Home.css"

const styles= {
    heroContainer: {
      height: 600,
      backgroundImage:`url(${Image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 24,
    }
   
}

 const Home = () => {
    return (
        <Layout title="Home">
          <h1 className="text">SHOP with us</h1>
<section class="hero is-large is-info"  style={styles.heroContainer}>
  <div class="hero-body">
  </div>
</section>






        </Layout>
    )
}

export default Home;