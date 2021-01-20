import React from 'react';
import Dropdown from '../../shared/Dropdown';

const dropdownItems = [
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
];

const Footer = () => {
  return (
    <div className="is-flex is-justify-content-space-between has-text-grey py-4">
      <div className="is-flex is-align-items-center">
        <p className="mr-2">Filas por página</p>
        <Dropdown items={dropdownItems} />
      </div>
      <div className="is-flex is-align-items-center">
        <p className="mr-6">1-10 de 30 filas</p>
        <div className="is-flex">
          <i className="fas fa-chevron-left is-block mr-2 is-clickable" />
          <i className="fas fa-chevron-right is-block ml-2 is-clickable" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
