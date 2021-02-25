import React from 'react';
import TreeNode from './TreeNode';
import './styles.scss';

const TreeView = ({ data = [] }) => {
  return (
    <div className="tree-view">
      <ul className="tree-container">
        {data.map((node) => (
          <TreeNode node={node} key={`${node.type}-${node.id}`} />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
