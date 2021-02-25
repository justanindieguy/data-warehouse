import api from '../apis/localApi';
import history from '../history';
import { ADD_COUNTRY } from './types';

export const addCountry = (formValues) => async (dispatch) => {
  const { data } = await api.post('/countries', formValues);

  dispatch({ type: ADD_COUNTRY, payload: data.data });
  history.push('/regions');
};
