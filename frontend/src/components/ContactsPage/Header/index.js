import React from 'react';

const Header = () => {
  return (
    <div className="py-6">
      <h1 className="is-size-3 has-text-weight-bold">Contactos</h1>
      <div className="is-flex is-justify-content-space-between">
        <div className="column is-two-fifths p-0">
          <div className="is-flex">
            <input className="input mr-2" type="text" />
            <button className="button">
              <span className="icon is-small has-text-link">
                <i className="fas fa-search" />
              </span>
            </button>
          </div>
        </div>
        <div>
          <button className="button is-link is-outlined mr-2">
            <span className="icon is-small">
              <i className="fas fa-upload" />
            </span>
          </button>
          <button className="button is-link is-outlined mr-2">
            Exportar contactos
          </button>
          <button className="button is-link">Agregar contacto</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
