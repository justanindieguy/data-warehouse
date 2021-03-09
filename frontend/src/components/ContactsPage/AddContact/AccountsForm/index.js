import React, { useState } from 'react';
import { OnChange } from 'react-final-form-listeners';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import SelectInput from '../../../shared/SelectInput';
import IconButton from '../../../shared/IconButton';

const AccountsForm = (props) => {
  const { fetchedChannels, accountNumber, accounts, onAddAccountClick } = props;
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [accountValue, setAccountValue] = useState('');

  const renderOptions = () => {
    return (
      <React.Fragment>
        <option value="DEFAULT" disabled>
          Seleccionar Canal
        </option>
        {!fetchedChannels.length
          ? null
          : fetchedChannels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
      </React.Fragment>
    );
  };

  return (
    <div className="accounts-form columns">
      <div className="column is-one-fifth">
        <FinalFormInput
          name={`account${accountNumber}.channelId`}
          defaultValue="DEFAULT"
        >
          <SelectInput
            label="Canal de contacto:"
            loading={!fetchedChannels.length}
            renderOptions={renderOptions}
            disabled={!fetchedChannels.length}
          />
        </FinalFormInput>
        <OnChange name={`account${accountNumber}.channelId`}>
          {(value) => setSelectedChannel(value)}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name={`account${accountNumber}.accountValue`}>
          <FormInput
            label="Cuenta de usuario:"
            placeholder="@ejemplo"
            disabled={!selectedChannel}
          />
        </FinalFormInput>
        <OnChange name={`account${accountNumber}.accountValue`}>
          {(value) => setAccountValue(value)}
        </OnChange>
      </div>
      <div className="column is-one-fifth is-flex is-align-items-flex-end">
        <IconButton
          icon="fa-plus"
          content="Añadir canal"
          disabled={!selectedChannel || !accountValue}
          onBtnClick={() =>
            onAddAccountClick([
              ...accounts,
              {
                accountNumber: accounts[accounts.length - 1].accountNumber + 1,
              },
            ])
          }
        />
      </div>
    </div>
  );
};

export default AccountsForm;
