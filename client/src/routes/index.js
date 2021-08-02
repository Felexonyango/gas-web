import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Store from '../pages/store';
import Check from '../pages/Check';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Home from "../pages/Home";
import Contact from "../pages/Contact.";
import Register from "../pages/auth/Register";
import Checkout from "../pages/Checkout"
import Login from "../pages/About";
import AboutUs from "../pages/AboutUs";
import Subscription  from '../pages/Subscription'

const Routes = () => {
  return (
    <Router>
        <Switch>
          
        <Route exact  path='/' component={Home} />
          <Route path="/checkout" component={Check} />
        
          <Route path ="/contact" component={Contact}/>
          < Route path="/login"component={Login}/>
          <Route path="/register"component={Register}/>
         <Route path="/about"component={AboutUs}/>
          <Route path="/order" component={Store}/>
          <Route path="/cart" component={Cart} />
          <Route path="*" component={NotFound} />
          <Route path="/sub"component={Subscription}/>
       
          <Route path="/checkout"component={Checkout}/>

        </Switch>
    </Router>
  );
}

export default Routes;