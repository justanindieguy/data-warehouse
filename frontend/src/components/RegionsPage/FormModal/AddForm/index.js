import React from 'react';
import { Form } from 'react-final-form';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import { required } from '../../../../validations';

const AddForm = ({ onFormSubmit, formId, foreignKeyId, foreignKeyName }) => {
  return (
    <Form onSubmit={onFormSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit} id={formId}>
          <FinalFormInput name="name" validators={[required]}>
            <FormInput required={true} label="Nombre:" />
          </FinalFormInput>
          {foreignKeyId && foreignKeyName && (
            <FinalFormInput name={foreignKeyName} defaultValue={foreignKeyId}>
              <FormInput type="number" hidden={true} />
            </FinalFormInput>
          )}
        </form>
      )}
    </Form>
  );
};

export default AddForm;
