import axios from 'axios';
import { API_URL } from '../../server/config';
import {
  MODAL_OPEN,
  MODAL_CLOSED 
} from './constants';


/**
 * Error helper
 */
/*export function homeError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}
*/

export function openModal() {
  
  console.log("Open modal")
  
  return function (dispatch) {
   
    dispatch({
      type: MODAL_OPEN,
      payload: response.data,
    });
 
  }
}

export function closeModal() {
  
  console.log("Close modal")
  
  return function (dispatch) {
   
    dispatch({
      type: MODAL_CLOSED,
      payload: response.data,
    });
 
  }
}
