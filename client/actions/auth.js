import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../../server/config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,

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
  
  console.log("auth.js Open modal")
  console.log(props)
  
  return function (dispatch) {
   
    dispatch({
      type: MODAL_OPEN, 
      payload: props
    });
 
  }
}

export function closeModal() {
  
  console.log("auth.js Close modal")
  
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

  console.log("Auth.js Signup user function")
  console.log(props)

  return function (dispatch) {

    axios.post(`${API_URL}/signup`, props)
      .then(response => {

        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(localStorage)
        
        dispatch({ 
          type: SIGNUP_SUCCESS, 
          payload: response.data 
        });
        
        console.log("Auth.js signup Success")

        signinUser(props); 
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, "User already exists.")));
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  
  console.log("Auth.js Signin user function")

  const { email, password } = props;
  console.log(props)

  return function (dispatch) {

    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {

        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        //Assign the current user to the local storage
        localStorage.setItem('current', email);
        dispatch({ type: SIGNIN_SUCCESS});
        console.log("Auth.js signin Success")
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}


/**
 * Sign out
 */
export function signoutUser() {

  console.log("Auth.js Signout user")
  //Clear the local storage. 
  localStorage.clear();

  return function (dispatch) {

    axios.get(`${API_URL}/signout`)
    .then(response=> {

      dispatch({ type: LOGOUT_SUCCESS });
      //console.log(response.data)
    })
    .catch(response => dispatch(authError(LOGOUT_FALIURE, "Could not log out user.")));
  }

}

