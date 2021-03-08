import React from 'react';
import './styles.scss';

const RangeInput = (props) => {
  return (
    <div className="range-container field">
      <label className="label">{props.label}</label>
      <div className="control is-flex">
        <input
          className="mr-4"
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={props.input.value}
          onChange={(evt) =>
            props.form.change(props.fieldName, evt.target.value)
          }
        />
        <div className="select">
          <select {...props.input} name={props.name}>
            {props.values.map((value) => (
              <option key={value.value} value={value.value}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
