import { FETCH_CONTACTS } from './types';
import api from '../apis/localApi';

export const fetchContacts = (limit = 10) => async (dispatch) => {
  const { data } = await api.get('/contacts', { params: { limit } });
  dispatch({ type: FETCH_CONTACTS, payload: data });
};
