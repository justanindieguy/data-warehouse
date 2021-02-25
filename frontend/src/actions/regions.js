import api from '../apis/localApi';
import history from '../history';
import { ADD_REGION } from './types';

export const addRegion = (formValues) => async (dispatch) => {
  const { data } = await api.post('/regions', formValues);

  dispatch({ type: ADD_REGION, payload: data.data });
  history.push('/regions');
};
