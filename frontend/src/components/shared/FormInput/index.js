import React from 'react';

const FormField = (props) => {
  const { input, meta } = props;

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div
        className={`control ${props.iconLeft && 'has-icons-left'} ${
          props.iconRight && 'has-icons-right'
        }`}
      >
        <input
          type={!props.type ? 'text' : props.type}
          className="input"
          placeholder={props.placeholder}
          required={props.required}
          {...input}
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
      {meta && meta.error && meta.touched && (
        <p className="help is-danger">{meta.error}</p>
      )}
    </div>
  );
};

export default FormField;
