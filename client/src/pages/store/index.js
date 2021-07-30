import React from 'react';
import Layout from '../../components/Layout';

import ProductsGrid from './ProductsGrid';


const Store = () => {
    
    return ( 
        <Layout title="Store"  >
            <div >
             <ProductsGrid/>
          
            </div>
        </Layout>
     );
}
 
export default Store;