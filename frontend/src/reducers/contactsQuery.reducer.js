import {
  FETCH_CONTACTS,
  SET_ROWS_LIMIT,
  SET_SORT_BY,
  SET_OFFSET,
} from '../actions/types';

const INITIAL_STATE = {
  totalContacts: null,
  limit: 10,
  offset: 0,
  ascending: true,
  sortBy: 'name',
};

const contactsQueryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, totalContacts: action.payload.total };
    case SET_ROWS_LIMIT:
      return { ...state, limit: action.payload, offset: 0 };
    case SET_SORT_BY:
      // If sortBy value is the same then toggle ascending value.
      if (action.payload === state.sortBy) {
        return { ...state, ascending: !state.ascending };
      }

      return { ...state, ascending: true, sortBy: action.payload };
    case SET_OFFSET:
      const goToNextPage = action.payload;

      if (goToNextPage) {
        if (state.offset + state.limit >= state.totalContacts) {
          return { ...state };
        }

        return { ...state, offset: state.offset + state.limit };
      } else {
        if (state.offset - state.limit < 0) {
          return { ...state };
        }

        return { ...state, offset: state.offset - state.limit };
      }
    default:
      return state;
  }
};

export default contactsQueryReducer;
