import React, { useState } from 'react';
import TreeView from '../index';

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisible] = useState(false);
  const hasChildren = node.children ? true : false;

  return (
    <li className="tree-node">
      <div className="node-content">
        <div
          className="tree-label is-flex is-align-items-center"
          onClick={() => setChildVisible(!childVisible)}
        >
          {hasChildren && (
            <div className="mr-1">
              <i
                className={`fas ${
                  childVisible ? 'fa-caret-down' : 'fa-caret-right'
                }`}
              />
            </div>
          )}

          <div className="node-content">{node.name}</div>
        </div>

        {hasChildren && childVisible && (
          <div className="tree-node">
            <ul className="tree-container">
              <TreeView data={node.children} />
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default TreeNode;
