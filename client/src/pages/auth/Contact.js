import React from 'react'
import Layout from '../../components/Layout'
const Contact = () => {
    return (
        <Layout title="contact">

<div className="text-center mt-5">

<h1>CONTACT US </h1>

</div>

<div className='form-container'>

<div className='form-group'>
 
 <input
   id='name'
   type='text'
   name='name'
   placeholder="Name"


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


 <textarea
   type='password'
   name='password'
  placeholder="Send us text  message "/>
<input
 type='submit'
 value='submit'
 className='btn btn-primary btn-block'
/>

</div>

        </Layout>
    
    )
}

export default Contact
