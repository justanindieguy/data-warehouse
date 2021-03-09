import React from 'react';

const IconButton = ({ style, icon, content, type, disabled, onBtnClick }) => {
  return (
    <button
      className={`button ${style ? style : ''}`}
      type={type ? type : 'button'}
      disabled={disabled ? true : false}
      onClick={onBtnClick}
    >
      <span className="icon">
        <i className={`fas ${icon}`} />
      </span>
      <span>{content}</span>
    </button>
  );
};

export default IconButton;
