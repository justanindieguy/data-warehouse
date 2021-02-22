import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions';
import Form from './CreateUserForm';
import Modal from '../shared/Modal';

const UsersPage = ({ newUser, closeModal }) => {
  const getModalContent = () => {
    if (newUser) {
      return (
        <div className="content">
          <ul>
            <li>
              <b>Nombre:</b> {newUser.name}
            </li>
            <li>
              <b>Email:</b> {newUser.email}
            </li>
          </ul>
        </div>
      );
    }

    return null;
  };

  const getModalFooter = () => {
    return (
      <button className="button is-success" onClick={closeModal}>
        Aceptar
      </button>
    );
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half box">
        <h1 className="has-text-centered has-text-weight-semibold is-size-4">
          Crear usuario
        </h1>
        <Form />
        <Modal
          title="Usuario Creado"
          content={getModalContent()}
          footer={getModalFooter()}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { newUser: state.newUser };
};

export default connect(mapStateToProps, { closeModal })(UsersPage);
