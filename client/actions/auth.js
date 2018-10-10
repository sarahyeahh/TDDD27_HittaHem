import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../../server/config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  SIGNIN_SUCCESS,
  SIGNIN_ADMIN_SUCCESS,
  SIGNIN_FAILURE,
  
  FETCH_USERS,
  FETCH_USERS_FAILURE,

  LOGOUT_SUCCESS,
  LOGOUT_FALIURE,
 
  MODAL_OPEN,
  MODAL_CLOSED ,
} from './constants';


//ACTION CREATORS FOR AUTH

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

export function openModal(props) {

  return function (dispatch) {
   
    dispatch({
      type: MODAL_OPEN, 
      payload: props
    });
 
  }
}

export function closeModal() {
  
  return function (dispatch) {
   
    dispatch({
      type: MODAL_CLOSED
    });
 
  }
}

/**
 * Sign up
 */
export function signupUser(props) {

  const { email, password } = props;
  console.log(email)

  return function (dispatch) {

    axios.post(`${API_URL}/signup`, props)
      .then(response => {

        console.log(response.data)

        dispatch({ 
          type: SIGNUP_SUCCESS, 
          payload: response.data 
        });

        
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, "User already exists.")));
  }
    
}

/**
 * Sign in
 */
export function signinUser(props) {

  console.log("SIGN IN USER")
  
  const { email, password } = props;

  if(email == "admin"){
    return function (dispatch) {

      console.log("Sign in admin")

      axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        //Assign the current user to the local storage
        localStorage.setItem('current', email);
        dispatch({ type: SIGNIN_ADMIN_SUCCESS});
        console.log("Auth.js signin ADMIN Success")
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
    }

  }else{

    return function (dispatch) {

      console.log("Sign in normal user")

      axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        //Assign the current user to the local storage
        localStorage.setItem('current', email);
        dispatch({ type: SIGNIN_SUCCESS});
        console.log("Auth.js signin Success")
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
    }
  }

  
}


/**
 * Sign out
 */
export function signoutUser() {

  //Clear the local storage. 
  localStorage.clear();

  return function (dispatch) {

    axios.get(`${API_URL}/signout`)
    .then(response=> {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(response => dispatch(authError(LOGOUT_FALIURE, "Could not log out user.")));
  }

}

export function getAllUsers(){

  return function (dispatch) {

    axios.post(`${API_URL}/getUsers`)
      .then(response => {

        console.log(response.data)

        dispatch({
          type: FETCH_USERS,
          payload: response.data,
        });

      })
      .catch(response => dispatch(authError(FETCH_USERS_FAILURE, "Could not find any users.")));
  }

}

