import { TOGGLE_MODAL_OPEN, CLOSE_MODAL, OPEN_MODAL } from '../actions/types';

const modalReducer = (state = { opened: false, type: null }, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_OPEN:
      return { ...state, opened: !state.opened };
    case CLOSE_MODAL:
      return { ...state, opened: false };
    case OPEN_MODAL:
      return { ...state, opened: true };
    default:
      return state;
  }
};

export default modalReducer;
