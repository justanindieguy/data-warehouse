import React from 'react';

const DropdownItem = ({ item, idx, activeIdx, setActiveIdx }) => {
  const isActiveClass = activeIdx === idx ? 'is-active' : '';

  return (
    <div
      className={`dropdown-item is-clickable ${isActiveClass}`}
      onClick={() => setActiveIdx(idx)}
    >
      {item.label}
    </div>
  );
};

export default DropdownItem;
