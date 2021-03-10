import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import ContentModal from '../../shared/ContentModal';
import ContactDataForm from './ContactDataForm';
import LocationForm from './LocationForm';
import AccountsForm from './AccountsForm';
import Actions from './Actions';
import { addContact } from '../../../actions';
import history from '../../../history';
import api from '../../../apis/localApi';
import './styles.scss';

const AddContact = ({ addContact }) => {
  const [accounts, setAccounts] = useState([{ accountNumber: 1 }]);
  const [fetchedChannels, setFetchedChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await api.get('/channels');
      setFetchedChannels(data);
    };

    fetchChannels();
  }, []);

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
        <Form onSubmit={(formValues) => addContact(formValues)}>
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <ContactDataForm />
              <LocationForm form={props.form} />
              {accounts.map((account) => (
                <AccountsForm
                  key={account.accountNumber}
                  accountNumber={account.accountNumber}
                  accounts={accounts}
                  onAddAccountClick={setAccounts}
                  fetchedChannels={fetchedChannels}
                />
              ))}
              <Actions
                hasValidationErrors={props.hasValidationErrors}
                hasSubmitErrors={props.hasSubmitErrors}
                dirtySinceLastSubmit={props.dirtySinceLastSubmit}
              />
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

export default connect(null, { addContact })(AddContact);
