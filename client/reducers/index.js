//Root reducer
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import hpReducer from './hpReducer';
import modalReducer from './modalReducer';

// Store 
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  home: homeReducer,
  homepage: hpReducer, 
  modal: modalReducer,
});

export default rootReducer;
