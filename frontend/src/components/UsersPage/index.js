import React from 'react';
import Form from './CreateUserForm';
import Modal from '../shared/Modal';

const UsersPage = () => {
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half box">
        <h1 className="has-text-centered has-text-weight-semibold is-size-4">
          Crear usuario
        </h1>
        <Form />
        <button className="button">Open Modal</button>
        <Modal />
      </div>
    </div>
  );
};

export default UsersPage;
