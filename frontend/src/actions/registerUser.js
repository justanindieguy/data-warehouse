import _ from 'lodash';
import localApi from '../apis/localApi';
import { openModal } from '../actions';
import { UPDATE_NEW_USER } from './types';
import store from '../store';

export const registerUser = (formObj) => async (dispatch) => {
  try {
    const response = await localApi.post('/users', formObj);
    const { name, email } = response.data.data;

    dispatch(updateNewUser({ name, email }));

    const { newUser } = store.getState();

    if (newUser) {
      dispatch(openModal());
    }
  } catch (err) {
    return _.mapValues(err.response.data.errors, (err) => err.msg);
  }
};

export const updateNewUser = (newUser) => {
  return { type: UPDATE_NEW_USER, payload: newUser };
};
