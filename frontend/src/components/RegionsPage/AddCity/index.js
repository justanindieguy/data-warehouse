import React from 'react';
import { connect } from 'react-redux';
import FormModal from '../FormModal';
import { addCity } from '../../../actions';

const AddCity = ({ match, addCity }) => {
  return (
    <FormModal
      title="Añadir Ciudad"
      onFormSubmit={addCity}
      formId="add-city"
      originRoute="/regions"
      foreignKeyId={match.params.id}
      foreignKeyName="countryId"
    />
  );
};

export default connect(null, { addCity })(AddCity);
