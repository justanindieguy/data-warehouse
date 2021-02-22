import { TOGGLE_MODAL_OPEN, CLOSE_MODAL, OPEN_MODAL } from '../actions/types';

const modalReducer = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_OPEN:
      return !state;
    case CLOSE_MODAL:
      return false;
    case OPEN_MODAL:
      return true;
    default:
      return state;
  }
};

export default modalReducer;
