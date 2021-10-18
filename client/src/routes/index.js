import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Store from '../pages/store';
import Check from '../pages/Check';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Home from "../pages/Home";
import recover from "../pages/Recover";
import Register from "../pages/auth/Register";
import Login from "../pages/Login";
import About from "../pages/About";
import Sub from "../pages/Sub"
import Contact from "../pages/auth/Contact"

const Routes = () => {
  return (
    <Router>
        <Switch>
          
        <Route exact  path='/' component={Home} />
          <Route path="/checkout" component={Check} />
        <Route path="/subscribe" component={Sub}/>
          <Route path ="/recover" component={recover}/>
          < Route path="/login"component={Login}/>
          <Route path="/register"component={Register}/>
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