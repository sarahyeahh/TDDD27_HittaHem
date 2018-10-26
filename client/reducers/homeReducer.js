import {
  FETCH_HOMES,
  SEARCH_HOMES, 
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  ADD_HOME,
  ADD_HOME_FAILURE,
  RESET,
  DELETE_HOME, 
  DELETE_HOME_FAILURE, 
} from '../actions/constants';

const initialState = {
  list: {}, 
  error: {}, 
  searchResult: {}, 
  add: false,
};

export default function(state = {}, action) {

  switch(action.type) {

    //Add home
    case ADD_HOME:
      return {...state, add: true, error: action.payload };
    case ADD_HOME_FAILURE:
      return { ...state, add: false, error: action.payload };

    //Delete home
    case DELETE_HOME: 
    return { ...state, error: {} };

    case DELETE_HOME_FAILURE: 
    return { ...state, error: action.payload };
    
    //Update
    case UPDATE_FAILURE: 
      return {...state, error: action.payload};
    case UPDATE_SUCCESS:
      return {...state, error:{}};

    //Search/fetch
    case FETCH_HOMES:
      return {found: true, list: action.payload};
    case SEARCH_SUCCESS:
      return {found: true, searchResult: action.payload};
    case SEARCH_FAILURE:
      return {found: false, error: action.payload};
    
    //Reset   
    case RESET: 
      return initialState;
  }

  return state;
}
