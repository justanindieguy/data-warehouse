import React, { useState, useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import SelectInput from '../../../shared/SelectInput';
import IconButton from '../../../shared/IconButton';
import api from '../../../../apis/localApi';

const AccountsForm = () => {
  const [fetchedChannels, setFetchedChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [accountValue, setAccountValue] = useState('');

  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await api.get('/channels');
      setFetchedChannels(data);
    };

    fetchChannels();
  }, []);

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
        <FinalFormInput name="channel.channelId" defaultValue="DEFAULT">
          <SelectInput
            required
            label="Canal de contacto:"
            loading={!fetchedChannels.length}
            renderOptions={renderOptions}
            disabled={!fetchedChannels.length}
          />
        </FinalFormInput>
        <OnChange name="channel.channelId">
          {(value) => setSelectedChannel(value)}
        </OnChange>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="channel.accountValue">
          <FormInput
            required
            label="Cuenta de usuario:"
            placeholder="@ejemplo"
            disabled={!selectedChannel}
          />
        </FinalFormInput>
        <OnChange name="channel.accountValue">
          {(value) => setAccountValue(value)}
        </OnChange>
      </div>
      <div className="column is-one-fifth is-flex is-align-items-flex-end">
        <IconButton
          icon="fa-plus"
          content="Añadir canal"
          disabled={!selectedChannel || !accountValue}
        />
      </div>
    </div>
  );
};

export default AccountsForm;
