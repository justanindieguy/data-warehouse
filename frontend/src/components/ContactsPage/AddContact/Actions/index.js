import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
  return (
    <div className="actions">
      <div className="columns">
        <div className="column is-2 is-offset-8 is-flex is-justify-content-flex-end">
          <Link className="button is-link is-inverted" to="/contacts">
            Cancelar
          </Link>
        </div>
        <div className="column is-2 is-flex is-justify-content-flex-end">
          <button className="button is-link" type="submit">
            Guardar Contacto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actions;
