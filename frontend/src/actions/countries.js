import api from '../apis/localApi';
import history from '../history';
import { ADD_COUNTRY, DELETE_COUNTRY, EDIT_COUNTRY } from './types';

export const addCountry = (formValues) => async (dispatch) => {
  const { data } = await api.post('/countries', formValues);

  dispatch({ type: ADD_COUNTRY, payload: data.data });
  history.push('/regions');
};

export const deleteCountry = (countryId) => async (dispatch) => {
  await api.delete(`/countries/${countryId}`);

  dispatch({ type: DELETE_COUNTRY, payload: countryId });
  history.push('/regions');
};

export const editCountry = (formValues) => async (dispatch) => {
  const { countryId } = formValues;
  delete formValues['countryId'];

  formValues.regionId = parseInt(formValues.regionId);

  const { data } = await api.put(`/countries/${countryId}`, formValues);

  dispatch({ type: EDIT_COUNTRY, payload: data.data });
  history.push('/regions');
};
