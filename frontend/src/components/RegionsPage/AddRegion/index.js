import React from 'react';
import { connect } from 'react-redux';
import { addRegion } from '../../../actions';
import FormModal from '../FormModal';

const AddRegion = ({ addRegion }) => {
  return (
    <FormModal
      title="Añadir Región"
      onFormSubmit={addRegion}
      formId="add-region"
      originRoute="/regions"
    />
  );
};

export default connect(null, { addRegion })(AddRegion);
