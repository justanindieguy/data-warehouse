import React from 'react';
import { connect } from 'react-redux';
import FormModal from '../FormModal';
import { addCountry } from '../../../actions';

const AddCountry = ({ match, addCountry }) => {
  return (
    <FormModal
      title="Añadir País"
      onFormSubmit={addCountry}
      formId="add-country"
      originRoute="/regions"
      foreignKeyId={match.params.id}
      foreignKeyName="regionId"
    />
  );
};

export default connect(null, { addCountry })(AddCountry);
