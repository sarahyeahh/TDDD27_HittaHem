import axios from 'axios';
import { API_URL } from '../../server/config';
//import User from '../../models/User';
import {
  FETCH_HOMES, 
} from './constants';


export function fetchHomes() {
  
  console.log("Fetch homes")

  //Måste skickas in här pga går inte att göra på server-sidan
  const current = localStorage.getItem('current');
  console.log("Current: " + current)
  
  return function (dispatch) {
    
    axios.get(`${API_URL}/homes`,
      { 
        headers: 
        { 
          user: current
        } 
      })
      .then(response => {

        //console.log(response.data)
        dispatch({
          type: FETCH_HOMES,
          payload: response.data,
        });
      });
  }
}
