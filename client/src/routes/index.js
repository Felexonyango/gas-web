import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Store from '../pages/store';
import Check from '../pages/Check';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Home from "../pages/Home";
import recover from "../pages/Recover";

import About from "../pages/About";
import Sub from "../pages/Sub"
import Contact from "../pages/auth/Contact"
import PrivateRoute from './PrivateRoute'

const Routes = () => {
  return (
    <Router>
        <Switch>
          
        <Route exact  path='/' component={Home} />
        <PrivateRoute exact path ="/subscribe" component={Sub}/>
        <PrivateRoute exact path="/checkout" component={Check} />
          <Route path ="/recover" component={recover}/>
        
          <Route path="/contact"component={Contact}/>
         <Route path="/about"component={About}/>
          <Route path="/order" component={Store}/>
          <Route path="/cart" component={Cart} />
          <Route path="*" component={NotFound} />
        </Switch>
    </Router>
  );
}

export default Routes;