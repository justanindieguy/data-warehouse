import api from '../apis/localApi';
import history from '../history';
import { ADD_CITY, DELETE_CITY, EDIT_CITY } from './types';

export const addCity = (formValues) => async (dispatch) => {
  const { data } = await api.post('/cities', formValues);

  dispatch({ type: ADD_CITY, payload: data.data });
  history.push('/regions');
};

export const deleteCity = (cityId) => async (dispatch) => {
  await api.delete(`/cities/${cityId}`);

  dispatch({ type: DELETE_CITY, payload: cityId });
  history.push('/regions');
};

export const editCity = (formValues) => async (dispatch) => {
  const { cityId } = formValues;
  delete formValues['cityId'];

  formValues.countryId = parseInt(formValues.countryId);
  formValues.cityId = parseInt(cityId);

  const { data } = await api.put(`/cities/${cityId}`, formValues);

  dispatch({ type: EDIT_CITY, payload: data.data });
  history.push('/regions');
};
