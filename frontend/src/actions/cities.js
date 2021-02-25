import api from '../apis/localApi';
import history from '../history';
import { ADD_CITY } from './types';

export const addCity = (formValues) => async (dispatch) => {
  const { data } = await api.post('/cities', formValues);

  dispatch({ type: ADD_CITY, payload: data.data });
  history.push('/regions');
};
