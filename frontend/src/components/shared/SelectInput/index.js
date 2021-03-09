import React from 'react';

const SelectInput = (props) => {
  const { input, meta, disabled } = props;
  const { error, submitError, dirtySinceLastSubmit, touched } = meta;

  return (
    <div className="field">
      <div className="control">
        <label className="label">{props.label}</label>
        <div className={`select ${props.loading ? 'is-loading' : ''}`}>
          <select
            {...input}
            disabled={disabled ? true : false}
            required={props.required ? true : false}
          >
            {props.renderOptions()}
          </select>
        </div>
      </div>
      {(error || (submitError && !dirtySinceLastSubmit)) && touched && (
        <p className="help is-danger">{error || submitError}</p>
      )}
    </div>
  );
};

export default SelectInput;
