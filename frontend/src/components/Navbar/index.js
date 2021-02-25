import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar is-link" aria-label="main navigation">
      <div className="navbar-bran">
        <Link to="/" className="navbar-item">
          LOGO
        </Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Link to="/" className="navbar-item">
            Contactos
          </Link>
          <Link to="/companies" className="navbar-item">
            Compañías
          </Link>
          <Link to="/users" className="navbar-item">
            Usuarios
          </Link>
          <Link to="/regions" className="navbar-item">
            Región / Ciudad
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
