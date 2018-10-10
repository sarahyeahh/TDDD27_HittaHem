import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  SIGNIN_SUCCESS,
  SIGNIN_ADMIN_SUCCESS,
  SIGNIN_FAILURE,

  AUTH_USER,
  UNAUTH_USER,

  LOGOUT_SUCCESS,
  LOGOUT_FALIURE,

} from '../actions/constants';

const initialState = {
  authenticated: false, 
  admin: false, 
  signup : false,
  error: {},
  state: {}
};

export default function(state = {}, action) {

  switch(action.type) {

    //Signup
    case SIGNUP_SUCCESS:
      return { ...state, signup: true, error: {} };
    case SIGNUP_FAILURE:
      return { ...state, signup: false, authenticated:false, error: action.payload };

    //Login
    case SIGNIN_ADMIN_SUCCESS: 
      return {...state, admin: true, authenticated: true, error: {} }; 
    case SIGNIN_SUCCESS: 
      return {...state, admin: false, authenticated: true, error: {} }; 
    case SIGNIN_FAILURE:
      return { ...state, error: action.payload };

    //Authentication
    case AUTH_USER:
      return { ...state, authenticated: true, error: {} };
    case UNAUTH_USER:
      return initialState;

    //Logout
    case LOGOUT_SUCCESS:
      return initialState; 
    case LOGOUT_FALIURE:
      return { ...state, authenticated: false, signup: true , error: action.payload };
  }

  return state;
}
