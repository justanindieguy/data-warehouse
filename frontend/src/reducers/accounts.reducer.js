import { FETCH_ACCOUNTS } from '../actions/types';

const accountsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default accountsReducer;
