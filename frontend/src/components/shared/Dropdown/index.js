import React, { useState, useRef } from 'react';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import DropdownItem from './DropdownItem';
import './styles.scss';

const Dropdown = ({ items, onSelectDropdownItem }) => {
  const [opened, setOpened] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const dropdownBox = useRef(null);

  useOutsideClickListener(dropdownBox, () => setOpened(false));

  const renderedItems = items.map((item, idx) => {
    item.idx = idx;

    const props = {
      item,
      activeIdx,
      setActiveIdx,
      onClick: onSelectDropdownItem,
    };

    return <DropdownItem {...props} key={item.label} />;
  });

  return (
    <div
      className={`dropdown ${opened ? 'is-active' : ''}`}
      onClick={() => setOpened(!opened)}
      ref={dropdownBox}
    >
      <div className="dropdown-trigger">
        <button className="button">
          <span>{items[activeIdx].label}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">{renderedItems}</div>
      </div>
    </div>
  );
};

export default Dropdown;
