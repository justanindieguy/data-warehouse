import { combineReducers } from 'redux';
import contactsReducer from './contacts.reducer';
import contactsQueryReducer from './contactsQuery.reducer';
import accountsReducer from './accounts.reducer';
import modalReducer from './modal.reducer';
import newUserReducer from './newUser.reducer';

export default combineReducers({
  contacts: contactsReducer,
  contactsQuery: contactsQueryReducer,
  newUser: newUserReducer,
  accounts: accountsReducer,
  modal: modalReducer,
});
