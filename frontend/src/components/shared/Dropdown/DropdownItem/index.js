import React from 'react';

const DropdownItem = ({ item, activeIdx, setActiveIdx, onClick }) => {
  const isActiveClass = activeIdx === item.idx ? 'is-active' : '';

  return (
    <div
      className={`dropdown-item is-clickable ${isActiveClass}`}
      onClick={() => {
        setActiveIdx(item.idx);
        onClick(item.value);
      }}
    >
      {item.label}
    </div>
  );
};

export default DropdownItem;
