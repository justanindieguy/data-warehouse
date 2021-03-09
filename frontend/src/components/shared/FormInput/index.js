import React from 'react';

const FormField = (props) => {
  const { input, meta } = props;
  const { error, submitError, dirtySinceLastSubmit, touched } = meta;

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div
        className={`control ${props.iconLeft ? 'has-icons-left' : ''} ${
          props.iconRight ? 'has-icons-right' : ''
        }`}
      >
        <input
          {...input}
          type={!props.type ? 'text' : props.type}
          className="input"
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled ? true : false}
        />
        {props.iconLeft && (
          <span className="icon is-small is-left">
            <i className={`fas ${props.iconLeft}`} />
          </span>
        )}
        {props.iconRight && (
          <span className="icon is-small is-right">
            <i className={`fas ${props.iconRight}`} />
          </span>
        )}
      </div>
      {(error || (submitError && !dirtySinceLastSubmit)) && touched && (
        <p className="help is-danger">{error || submitError}</p>
      )}
    </div>
  );
};

export default FormField;
