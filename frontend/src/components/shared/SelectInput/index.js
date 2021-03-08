import React from 'react';

const SelectInput = (props) => {
  return (
    <div className="field">
      <div className="control">
        <label className="label">{props.label}</label>
        <div className={`select ${props.loading ? 'is-loading' : ''}`}>
          <select
            {...props.input}
            disabled={props.disabled ? true : false}
            required={props.required ? true : false}
          >
            {props.renderOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
