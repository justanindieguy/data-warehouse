import { combineReducers } from 'redux';
import accountsReducer from './accounts.reducer';
import contactsReducer from './contacts.reducer';
import contactsQueryReducer from './contactsQuery.reducer';
import modalReducer from './modal.reducer';
import newUserReducer from './newUser.reducer';
import regionsReducer from './regions.reducer';
import countriesReducer from './countries.reducer';
import citiesReducer from './cities.reducer';

export default combineReducers({
  accounts: accountsReducer,
  contacts: contactsReducer,
  contactsQuery: contactsQueryReducer,
  modal: modalReducer,
  newUser: newUserReducer,
  regions: regionsReducer,
  countries: countriesReducer,
  cities: citiesReducer,
});
