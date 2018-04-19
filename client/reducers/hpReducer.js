import {
  FETCH_HOMES,
  FETCH_HOMES_FAILURE,
  SEARCH_HOMES,
  FETCH_HOMEPAGE,
} from '../actions/constants';

export default function(state = {}, action) {

  switch(action.type) {
  
    case FETCH_HOMEPAGE:
      return { list: action.payload, ...state };
    default:
      return state; 
    
  }

  return state;
}
