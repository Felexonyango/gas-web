import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';
import {CartIcon} from '../icons';
import styles from './header.module.scss';

const Header = () => {

    const {itemCount} = useContext(CartContext);

    return ( 
        <header className={styles.header}>
          
            <Link to='/'>HOME</Link>
            <Link to ='/order'>ORDER NOW</Link>
          <Link to ="/about" >OUR STORY </Link>
            <Link to ='/register'>SIGN IN</Link>
            
            <Link to='/cart'> <CartIcon/> ({itemCount})</Link>
        </header>
     );
}
 
export default Header;