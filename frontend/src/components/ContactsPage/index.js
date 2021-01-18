import React from 'react';
import UsersTable from './UsersTable';

const ContactsPage = ({ contacts, fetchContacts }) => {
  return (
    <div className="container is-fluid">
      <UsersTable />
    </div>
  );
};

export default ContactsPage;
