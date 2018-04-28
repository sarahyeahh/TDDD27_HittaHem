import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
} from '../actions/constants';

export default function(state = {}, action) {

  switch(action.type) {
  
    case FETCH_USERS:
      return { list: action.payload, ...state };
    case FETCH_USERS_FAILURE:
      return { error: action.payload , ...state };    
  }

  return state;
}
