import _ from 'lodash';
import { FETCH_REGIONS, ADD_REGION, CLEAR_PLACES } from '../actions/types';

const placesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_REGIONS:
      return [...action.payload];
    case ADD_REGION:
      return _.sortBy([...state, action.payload], (region) => region.name);
    case CLEAR_PLACES:
      return [];
    default:
      return state;
  }
};

export default placesReducer;
