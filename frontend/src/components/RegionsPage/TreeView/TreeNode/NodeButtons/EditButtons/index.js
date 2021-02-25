import React from 'react';

const EditButtons = () => {
  return (
    <div className="is-flex node-btn-container">
      <button className="button is-link is-light is-small mr-2">Editar</button>
      <button className="button is-danger is-light is-small">Eliminar</button>
    </div>
  );
};

export default EditButtons;
