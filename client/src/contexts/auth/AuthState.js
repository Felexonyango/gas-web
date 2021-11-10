import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import { AuthReducer} from './authReducer'
import setAuthToken from "../../utils/setAuthToken";
import  {AlertReducer}  from "../alert/alertReducer"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  PAY_MPESA_SUCCESS,
  PAY_MPESA_FAILURE
} from "../types";

const AuthState = props => {
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get("/api/user");
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  // Register User
  const register =(username,email,phone,password)=>async dispatch=>{
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ username, email, password,phone });

    try {
      const res = await axios.post("api/users/register",body,config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(AlertReducer(error.msg, "danger")));
    }

      dispatch({
        type: REGISTER_FAIL,
     
      });
    }
  };

  // Login User
  const login = (email, password) => async dispatch => {
  
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });


    try {
      const res = await axios.post("api/users/login",body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(AlertReducer(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
       
      });
    }
  };
  // Logout

  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

//Reset passord 
const forgetpassword = (email)=>async dispatch =>{
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email });

 try{

 const res = await axios.post("api/users/reset-password", body,config)
 dispatch({
  type: FORGET_PASSWORD_SUCCESS,
  payload: res.data
})

dispatch(loadUser());
 }
 catch(error){

  const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(AlertReducer(error.msg, "danger")));
      }

dispatch({
  type:FORGET_PASSWORD_FAIL,
  
})


 }
}
const pay=(phone,amount)=> async dispatch =>{
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try{
    const body = JSON.stringify({ phone,amount});

 
    const res = await axios.post("api/v1/stkpush", body,config)

    dispatch({
     type: PAY_MPESA_SUCCESS,
     payload: res.data
   })

   
    }
    catch(error){
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(AlertReducer(error.msg, "danger")));
      }

   dispatch({
     type:PAY_MPESA_FAILURE,
     
   })
   
   
    }
}
  return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        
        clearErrors,
        forgetpassword,
        pay
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
