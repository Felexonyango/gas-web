import React, { useReducer } from "react";
import {v4 as uuid} from 'uuid'
import {AlertContext} from "./alertContext";
import {AlertReducer} from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  const contextValues = {
  setAlert,
    ...state
} 

  return (
    <AlertContext.Provider value ={contextValues}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
