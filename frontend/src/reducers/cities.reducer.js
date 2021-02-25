import { FETCH_CITIES } from '../actions/types';

const citiesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CITIES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default citiesReducer;
