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
} from "../types"

export  const AuthReducer =(state, action) => {
  
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      case FORGET_PASSWORD_SUCCESS:
        case PAY_MPESA_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case FORGET_PASSWORD_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      case PAY_MPESA_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
