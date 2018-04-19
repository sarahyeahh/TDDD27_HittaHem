import {
  MODAL_OPEN,
  MODAL_CLOSED
} from '../actions/constants';

//Initial state
const initialState = {
  modalIsOpen: false, 
  type: null, 
};

export default function(state = {}, action) {
  console.log(action.payload)
  switch(action.type) {
  
    case MODAL_OPEN:
      return { modalIsOpen: true, type: action.payload};
    case MODAL_CLOSED:
      return initialState;  
  }

  return state;
}
