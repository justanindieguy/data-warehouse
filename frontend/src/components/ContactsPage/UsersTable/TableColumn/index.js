import React from 'react';

const TableColumn = ({ label }) => {
  if (label.type === 'input') {
    return (
      <th className="has-text-centered">
        <input type={label.content} />
      </th>
    );
  }

  if (label.type === 'text' && label.sortable) {
    return (
      <th className="is-clickable is-unselectable">
        <span className="title is-size-6">{label.content}</span>
        <i className="fas fa-sort ml-2" />
      </th>
    );
  }

  return (
    <th>
      <span className="title is-size-6">{label.content}</span>
    </th>
  );
};

export default TableColumn;
