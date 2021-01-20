import _ from 'lodash';
import { FETCH_CONTACTS, FETCH_ACCOUNTS } from './types';
import api from '../apis/localApi';

export const fetchContactsAndAccounts = () => async (dispatch, getState) => {
  await dispatch(fetchContacts());

  _.chain(getState().contacts)
    .map('id')
    .uniq()
    .forEach((userId) => dispatch(fetchAccounts(userId)))
    .value();
};

export const fetchContacts = (limit = 10, sortBy = 'name') => async (
  dispatch
) => {
  const { data } = await api.get('/contacts', { params: { limit, sortBy } });

  dispatch({ type: FETCH_CONTACTS, payload: data });
};

// Fetch all the accounts associated with one userId.
export const fetchAccounts = (userId) => async (dispatch) => {
  const accounts = {};

  try {
    const { data } = await api.get(`/accounts/${userId}`);
    accounts[userId] = data;
  } catch (err) {
    if (err.response.status === 404) {
      accounts[userId] = [];
    }
  }

  dispatch({ type: FETCH_ACCOUNTS, payload: accounts });
};
