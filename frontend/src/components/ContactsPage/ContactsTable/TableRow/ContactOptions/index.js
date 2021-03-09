import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useOutsideClickListener from '../../../../hooks/useOutsideClickListener';
import './styles.scss';

const ContactOptions = ({ contactId }) => {
  const [opened, setOpened] = useState(false);
  const dropdownBox = useRef(null);

  useOutsideClickListener(dropdownBox, () => setOpened(false));

  return (
    <div
      className={`dropdown is-centered ${opened ? 'is-active' : ''}`}
      onClick={() => setOpened(!opened)}
      ref={dropdownBox}
    >
      <div className="dropdown-trigger">
        <button className="button is-link is-inverted">
          <span className="icon is-small">
            <i className="fas fa-ellipsis-h has-text-grey-light" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <Link className="dropdown-item" to="/">
            Editar
          </Link>
          <Link className="dropdown-item" to={`/contacts/delete/${contactId}`}>
            Eliminar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactOptions;
