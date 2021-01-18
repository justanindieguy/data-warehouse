import { FETCH_CONTACTS } from '../actions/types';

const INITIAL_STATE = {
  total: 0,
  items: [],
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default contactsReducer;
