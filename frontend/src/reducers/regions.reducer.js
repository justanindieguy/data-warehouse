import { FETCH_REGIONS } from '../actions/types';

const placesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_REGIONS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default placesReducer;
