import React from 'react';

const FormField = (props) => {
  const { input, meta } = props;
  const {
    label,
    iconLeft,
    iconRight,
    type,
    placeholder,
    required,
    hidden,
  } = props;
  const { error, submitError, dirtySinceLastSubmit, touched } = meta;

  return (
    <div className="field" style={{ display: hidden ? 'none' : 'unset' }}>
      <label className="label">{label}</label>
      <div
        className={`control ${iconLeft ? 'has-icons-left' : ''} ${
          iconRight ? 'has-icons-right' : ''
        }`}
      >
        <input
          {...input}
          type={!type ? 'text' : type}
          className="input"
          placeholder={placeholder}
          required={required}
        />
        {iconLeft && (
          <span className="icon is-small is-left">
            <i className={`fas ${iconLeft}`} />
          </span>
        )}
        {iconRight && (
          <span className="icon is-small is-right">
            <i className={`fas ${iconRight}`} />
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
