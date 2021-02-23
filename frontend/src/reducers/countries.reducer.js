import { FETCH_COUNTRIES } from '../actions/types';

const countriesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default countriesReducer;
