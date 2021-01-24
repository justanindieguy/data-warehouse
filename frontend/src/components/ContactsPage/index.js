import React from 'react';
import Header from './Header';
import UsersTable from './UsersTable';
import Footer from './Footer';

const ContactsPage = () => {
  return (
    <div className="container is-fluid">
      <Header />
      <UsersTable />
      <Footer />
    </div>
  );
};

export default ContactsPage;
