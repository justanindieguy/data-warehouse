import React from 'react';

const RangeInput = ({ label, min, max, step, input }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input {...input} type="range" min={min} max={max} step={step} />
      </div>
    </div>
  );
};

export default RangeInput;
