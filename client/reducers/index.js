//Root reducer
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import hpReducer from './hpReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

// Store 
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  home: homeReducer,
  homepage: hpReducer, 
  modal: modalReducer,
});

export default rootReducer;
