import React from 'react';
import './styles.scss';

const NoResults = ({ icon, message }) => {
  return (
    <div className="content">
      <div className="container has-text-centered">
        <i className={`fas ${icon} no-results-icon`} />
        <h1>No se encontraron resultados</h1>
        <h4>{message}</h4>
      </div>
    </div>
  );
};

export default NoResults;
