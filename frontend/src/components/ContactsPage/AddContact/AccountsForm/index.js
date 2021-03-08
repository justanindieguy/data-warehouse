import React from 'react';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import SelectInput from '../../../shared/SelectInput';
import IconButton from '../../../shared/IconButton';

const AccountsForm = () => {
  const renderOptions = () => {
    return (
      <React.Fragment>
        <option value="DEFAULT" disabled>
          Seleccionar Canal
        </option>
        <option value="test">Test</option>
      </React.Fragment>
    );
  };

  return (
    <div className="accounts-form columns">
      <div className="column is-one-fifth">
        <FinalFormInput name="channel.channelId" defaultValue="DEFAULT">
          <SelectInput
            label="Canal de contacto:"
            renderOptions={renderOptions}
          />
        </FinalFormInput>
      </div>
      <div className="column is-one-fifth">
        <FinalFormInput name="channel.accountValue">
          <FormInput
            required={true}
            label="Cuenta de usuario:"
            placeholder="@ejemplo"
            disabled
          />
        </FinalFormInput>
      </div>
      <div className="column is-one-fifth is-flex is-align-items-flex-end">
        <IconButton icon="fa-plus" content="Añadir canal" disabled={true} />
      </div>
    </div>
  );
};

export default AccountsForm;
