import _ from 'lodash';
import { FETCH_CONTACTS, FETCH_ACCOUNTS, FETCH_NEW_QUERY } from './types';
import history from '../history';
import api from '../apis/localApi';
import { addAccount } from './accounts';

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

export const addContact = (formValues) => async (dispatch) => {
  const isAccount = (value, key) => {
    return _.startsWith(key, 'account');
  };

  const accounts = Object.values(_.pickBy(formValues, isAccount));
  const validAccounts = accounts.filter(
    (account) => account.channelId !== 'DEFAULT'
  );
  const parsedValues = _.omitBy(formValues, isAccount);

  const createdContact = await api.post('/contacts', parsedValues);
  const { id: newContactId } = createdContact.data.data;

  await Promise.all(
    validAccounts.map((account) =>
      addAccount({ ...account, contactId: newContactId })
    )
  );

  await dispatch(fetchContactsAndAccounts());
  history.push('/contacts');
};

export const deleteContact = (contactId) => async (dispatch) => {
  await api.delete(`/contacts/${contactId}`);

  await dispatch(fetchContactsAndAccounts());
  history.push('/contacts');
};
