import React from 'react';
import { Field } from 'react-final-form';

const SelectInput = ({ name, label, renderOptions, defaultValue }) => {
  return (
    <div className="field">
      <div className="control">
        <label className="label">{label}</label>
        <div className="select">
          <Field name={name} component="select" defaultValue={defaultValue}>
            {renderOptions()}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
