import _ from 'lodash';
import {
  FETCH_COUNTRIES,
  ADD_COUNTRY,
  EDIT_COUNTRY,
  DELETE_COUNTRY,
  CLEAR_PLACES,
} from '../actions/types';

const countriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return _.sortBy([...state, ...action.payload], (country) => country.name);
    case ADD_COUNTRY:
      return _.sortBy([...state, action.payload], (country) => country.name);
    case EDIT_COUNTRY:
      const updatedCountries = state.map((country) =>
        country.id === parseInt(action.payload.id) ? action.payload : country
      );

      return _.sortBy(updatedCountries, (country) => country.name);
    case DELETE_COUNTRY:
      return state.filter((country) => country.id !== parseInt(action.payload));
    case CLEAR_PLACES:
      return [];
    default:
      return state;
  }
};

export default countriesReducer;
