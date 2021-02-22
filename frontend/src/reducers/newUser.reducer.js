import { UPDATE_NEW_USER } from '../actions/types';

const newUserReducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_NEW_USER:
      return { ...action.payload };
    default:
      return state;
  }
};

export default newUserReducer;
