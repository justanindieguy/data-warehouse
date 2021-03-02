import _ from 'lodash';
import {
  FETCH_CITIES,
  ADD_CITY,
  EDIT_CITY,
  DELETE_CITY,
  CLEAR_PLACES,
} from '../actions/types';

const citiesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CITIES:
      return [...state, ...action.payload];
    case ADD_CITY:
      return _.sortBy([...state, action.payload], (city) => city.name);
    case EDIT_CITY:
      const updatedCities = state.map((city) =>
        city.id === parseInt(action.payload.id) ? action.payload : city
      );

      return _.sortBy(updatedCities, (city) => city.name);
    case DELETE_CITY:
      return state.filter((city) => city.id !== parseInt(action.payload));
    case CLEAR_PLACES:
      return [];
    default:
      return state;
  }
};

export default citiesReducer;
