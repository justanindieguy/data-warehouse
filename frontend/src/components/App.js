import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar';
import ContactsPage from './ContactsPage';
import UsersPage from './UsersPage';
import RegionsPage from './RegionsPage';

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" component={Navbar} />
      <Route path="/" exact component={ContactsPage} />
      <Route path="/users" exact component={UsersPage} />
      <Route path="/regions" exact component={RegionsPage} />
    </Router>
  );
};

export default App;
