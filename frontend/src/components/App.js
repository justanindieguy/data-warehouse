import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar';
import ContactsPage from './ContactsPage';
import UsersPage from './UsersPage';
import RegionsPage from './RegionsPage';
import AddRegion from './RegionsPage/AddRegion';
import AddCountry from './RegionsPage/AddCountry';
import AddCity from './RegionsPage/AddCity';

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" component={Navbar} />
      <Route path="/" exact component={ContactsPage} />
      <Route path="/users" exact component={UsersPage} />
      <Route path="/regions" component={RegionsPage} />
      <Route path="/regions/region/add" exact component={AddRegion} />
      <Route path="/regions/country/add/:id" exact component={AddCountry} />
      <Route path="/regions/city/add/:id" exact component={AddCity} />
    </Router>
  );
};

export default App;
