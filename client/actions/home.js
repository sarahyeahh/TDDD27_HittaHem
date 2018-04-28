import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../../server/config';
import {

  MODAL_OPEN,
  MODAL_CLOSED,

  FETCH_HOMES,
  FETCH_HOMES_FAILURE,
  SEARCH_HOMES,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  FETCH_HOMEPAGE,

  ADD_HOME,
  ADD_HOME_FAILURE,

  UPDATE_SUCCESS,
  UPDATE_FAILURE, 

  DELETE_HOME,
  DELETE_HOME_FAILURE,

  RESET, 
} from './constants';

//ACTION CREATORS FOR HOME

/**
 * Error helper
 */
export function homeError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

export function openModal() {
  
  console.log("home.js Open modal")
  const props = ""; 
  
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

export function getHomepage(props){

  return function (dispatch) {

    axios.post(`${API_URL}/search`, props)
      .then(response => {

        console.log(response.data)

        dispatch({
          type: FETCH_HOMEPAGE,
          payload: response.data,
        });

      })
      .catch(response => dispatch(homeError(SEARCH_FAILURE, "Could not find any homes.")));
  }

}

//ADD
export function addHome(props) {

  return function (dispatch) {

    axios.post(`${API_URL}/add`, props)
      .then(() => {

        dispatch({ type: ADD_HOME });
      
      })
      .catch(response => dispatch(homeError(ADD_HOME_FAILURE, "Could not add home.")));
  }
}

//UPDATE
export function updateHome(props) {

  return function (dispatch) {

    axios.post(`${API_URL}/update`, props)
      .then(response => {

        console.log(response.data)

        dispatch({
          type: UPDATE_SUCCESS,
          payload: response.data,
        });

      })
      .catch(response => dispatch(homeError(UPDATE_FAILURE, "Could not update home")));
     
  }

}

//DELETE
export function deleteTheHome(props) {

  return function (dispatch) {

    axios.post(`${API_URL}/delete`, props)
      .then(response => {

        console.log(response.data)

        dispatch({
          type: DELETE_HOME,
          payload: response.data,
        });

      })
      .catch(response => dispatch(homeError(DELETE_HOME_FAILURE, "Could not delete home")));
     
  }

}

//SEARCH
export function searchHome(props) {

  resetSearch();

  return function (dispatch) {

    axios.post(`${API_URL}/search`, props)
      .then(response => {

        console.log(response.data)

        dispatch({
          type: FETCH_HOMES,
          payload: response.data,
        });

      })
      .catch(response => dispatch(homeError(SEARCH_FAILURE, "Could not find home")));
     
  }
}

//Reset the search. 
export function resetSearch() {

  console.log("home.js Reset")

  return function (dispatch) {

    dispatch({
      type: RESET, 
    });
  }
}

