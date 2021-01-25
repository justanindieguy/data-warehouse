import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Navbar from './Navbar';
import ContactsPage from './ContactsPage';
import UsersPage from './UsersPage';

const App = () => {
  return (
    <Router history={history}>
      <Route path="/" component={Navbar} />
      <Route path="/" exact component={ContactsPage} />
      <Route path="/users" exact component={UsersPage} />
    </Router>
  );
};

export default App;
