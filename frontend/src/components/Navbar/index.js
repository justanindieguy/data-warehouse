import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar is-link" aria-label="main navigation">
      <div className="navbar-bran">
        <a href="/" className="navbar-item">
          LOGO
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <a href="./contacts" className="navbar-item">
            Contactos
          </a>
          <a href="./companies" className="navbar-item">
            Compañías
          </a>
          <a href="./users" className="navbar-item">
            Usuarios
          </a>
          <a href="./regions" className="navbar-item">
            Región / Ciudad
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
