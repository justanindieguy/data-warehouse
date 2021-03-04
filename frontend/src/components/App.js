import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar';
import ContactsPage from './ContactsPage';
import DeleteContact from './ContactsPage/DeleteContact';
import UsersPage from './UsersPage';
import RegionsPage from './RegionsPage';
import AddRegion from './RegionsPage/AddRegion';
import AddCountry from './RegionsPage/AddCountry';
import EditCountry from './RegionsPage/EditCountry';
import DeleteCountry from './RegionsPage/DeleteCountry';
import AddCity from './RegionsPage/AddCity';
import EditCity from './RegionsPage/EditCity';
import DeleteCity from './RegionsPage/DeleteCity';
import './styles.scss';

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" component={Navbar} />
      <Route exact path="/">
        <Redirect to="/contacts" />
      </Route>
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/contacts/delete/:id" exact component={DeleteContact} />
      <Route path="/users" exact component={UsersPage} />
      <Route path="/regions" component={RegionsPage} />
      <Route path="/regions/region/add" exact component={AddRegion} />
      <Route path="/regions/country/add/:id" exact component={AddCountry} />
      <Route path="/regions/country/edit/:id" exact component={EditCountry} />
      <Route
        path="/regions/country/delete/:id"
        exact
        component={DeleteCountry}
      />
      <Route path="/regions/city/add/:id" exact component={AddCity} />
      <Route path="/regions/city/edit/:id" exact component={EditCity} />
      <Route path="/regions/city/delete/:id" exact component={DeleteCity} />
    </Router>
  );
};

export default App;
