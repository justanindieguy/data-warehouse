import React from 'react';
import { Form } from 'react-final-form';
import { required } from '../../../../validations';
import FinalFormInput from '../../../shared/FinalFormInput';
import FormInput from '../../../shared/FormInput';
import SelectInput from '../../../shared/SelectInput';

const EditForm = (props) => {
  const {
    onFormSubmit,
    formId,
    initialNameValue,
    renderOptions,
    selectName,
    selectLabel,
    defaultSelectValue,
    foreignKeyId,
    foreignKeyName,
  } = props;

  return (
    <Form onSubmit={onFormSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit} id={formId}>
          <FinalFormInput
            name="name"
            validators={[required]}
            initialValue={initialNameValue}
          >
            <FormInput required={true} label="Nombre:" />
          </FinalFormInput>

          <FinalFormInput name={selectName} defaultValue={defaultSelectValue}>
            <SelectInput label={selectLabel} renderOptions={renderOptions} />
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

export default EditForm;
