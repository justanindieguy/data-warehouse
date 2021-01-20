import { FETCH_CONTACTS } from '../actions/types';

const INITIAL_STATE = {
  totalContacts: null,
};

const contactsQueryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, totalContacts: action.payload.total };
    default:
      return state;
  }
};

export default contactsQueryReducer;
