import React from 'react';
import { Link } from 'react-router-dom';

const EditButtons = ({ nodeType, nodeId }) => {
  return (
    <div className="is-flex node-btn-container">
      <Link
        className="button is-link is-light is-small mr-2"
        to={`/regions/${nodeType}/edit/${nodeId}`}
      >
        Editar
      </Link>
      <Link
        className="button is-danger is-light is-small"
        to={`/regions/${nodeType}/delete/${nodeId}`}
      >
        Eliminar
      </Link>
    </div>
  );
};

export default EditButtons;
