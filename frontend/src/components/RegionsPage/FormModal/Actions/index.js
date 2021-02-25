import React from 'react';
import { Link } from 'react-router-dom';

const Actions = ({ formId, originRoute }) => {
  return (
    <React.Fragment>
      <button className="button is-success" type="submit" form={formId}>
        Enviar
      </button>
      <Link className="button is-danger" to={originRoute}>
        Cancelar
      </Link>
    </React.Fragment>
  );
};

export default Actions;
