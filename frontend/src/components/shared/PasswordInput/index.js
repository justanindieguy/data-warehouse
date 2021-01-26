import React, { useState } from 'react';

const PasswordInput = ({ label, input, meta }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getInputType = () => (isVisible ? 'text' : 'password');
  const getIconClass = () => (isVisible ? 'fa-eye-slash' : 'fa-eye');

  return (
    <React.Fragment>
      <label className="label">{label}</label>
      <div className="field has-addons">
        <div className="control has-icons-left" style={{ width: '100%' }}>
          <input type={getInputType()} className="input" required {...input} />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
          {meta && meta.error && meta.touched && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            <span className="icon is-small is-right is-clickable">
              <i className={`fas ${getIconClass()}`} />
            </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PasswordInput;
