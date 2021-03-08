import React from 'react';
import { Form } from 'react-final-form';
import ContentModal from '../../shared/ContentModal';
import ContactDataForm from './ContactDataForm';
import LocationForm from './LocationForm';
import AccountsForm from './AccountsForm';
import Actions from './Actions';
import history from '../../../history';
import './styles.scss';

const AddContact = () => {
  const renderContent = () => {
    return (
      <div className="content">
        <div className="title-header">
          <h2 className="has-text-white">Nuevo Contacto</h2>
          <button
            className="delete is-large"
            onClick={() => history.push('/contacts')}
          ></button>
        </div>
        <Form onSubmit={(formValues) => console.log(formValues)}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <ContactDataForm />
              <LocationForm form={props.form} />
              <AccountsForm />
              <Actions />
            </form>
          )}
        </Form>
      </div>
    );
  };

  return (
    <ContentModal
      content={renderContent()}
      onDismiss={() => history.push('/contacts')}
    />
  );
};

export default AddContact;
