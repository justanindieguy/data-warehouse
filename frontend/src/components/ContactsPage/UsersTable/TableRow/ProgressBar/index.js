import React from 'react';
import './styles.scss';

const ProgressBar = ({ value }) => {
  const getClass = () => {
    switch (value) {
      case 100:
        return 'is-danger';
      case 75:
        return 'is-orange';
      case 50:
        return 'is-warning';
      case 25:
        return 'is-info';
      default:
        return 'is-grey-light';
    }
  };

  return (
    <div className="is-flex is-align-items-center is-justify-content-space-between pr-2">
      <p>{`${value}%`}</p>
      <progress
        className={`progress is-small ml-2 ${getClass()}`}
        style={{ width: '70%' }}
        value={value}
        max="100"
      >
        {value}
      </progress>
    </div>
  );
};

export default ProgressBar;
