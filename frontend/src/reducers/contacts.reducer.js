import { FETCH_CONTACTS } from '../actions/types';

const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return [...action.payload.items];
    default:
      return state;
  }
};

export default contactsReducer;
