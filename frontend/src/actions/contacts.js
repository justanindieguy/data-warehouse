import _ from 'lodash';
import { FETCH_CONTACTS, FETCH_ACCOUNTS, FETCH_NEW_QUERY } from './types';
import history from '../history';
import api from '../apis/localApi';
import store from '../store';

export const fetchContactsAndAccounts = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_NEW_QUERY }); // Resets the account's state.
  await dispatch(fetchContacts()); // Fetch new contacts according to query.

  _.chain(getState().contacts)
    .map('id')
    .uniq()
    .forEach((userId, idx) => {
      dispatch(fetchAccounts(userId, idx));
    })
    .value();
};

export const fetchContacts = () => async (dispatch, getState) => {
  const { offset, limit, sortBy, ascending } = getState().contactsQuery;

  const { data } = await api.get('/contacts', {
    params: { offset, limit, sortBy, ascending },
  });

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

export const deleteContact = (contactId) => async () => {
  await api.delete(`/contacts/${contactId}`);

  await store.dispatch(fetchContactsAndAccounts());
  history.push('/contacts');
};
