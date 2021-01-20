import { combineReducers } from 'redux';
import contactsReducer from './contacts.reducer';
import contactsQueryReducer from './contactsQuery.reducer';
import accountsReducer from './accounts.reducer';

export default combineReducers({
  contacts: contactsReducer,
  contactsQuery: contactsQueryReducer,
  accounts: accountsReducer,
});
