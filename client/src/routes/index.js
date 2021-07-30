import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Store from '../pages/store';
import Check from '../pages/Check';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Home from "../pages/Home";
import Contact from "../pages/Contact.";
import About from "../pages/About";

import Checkout from "../pages/Checkout"


const Routes = () => {
  return (
    <Router>
        <Switch>
          
        <Route exact path='/' component={Home} />
          <Route path="/checkout" component={Check} />
        
          <Route path ="/contact" component={Contact}/>
          < Route path="/about"component={About}/>
       
        
          <Route path="/order" component={Store}/>
          <Route path="/cart" component={Cart} />
          <Route path="*" component={NotFound} />
        
          <Route path="/checkout"component={Checkout}/>

        </Switch>
    </Router>
  );
}

export default Routes;