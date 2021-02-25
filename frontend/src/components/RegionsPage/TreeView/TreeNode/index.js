import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TreeView from '../index';
import EditButtons from './NodeButtons/EditButtons';

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisible] = useState(false);
  const hasChildren =
    node.children && node.children.length !== 0 ? true : false;

  const renderButtons = () => {
    switch (node.type) {
      case 'region':
        return (
          <Link
            className="button is-link is-outlined is-to-the-right"
            to={`/regions/country/add/${node.id}`}
          >
            Añadir País
          </Link>
        );
      case 'country':
        return (
          <React.Fragment>
            <EditButtons />
            <Link
              className="button is-link is-outlined is-to-the-right"
              to={`/regions/city/add/${node.id}`}
            >
              Añadir Ciudad
            </Link>
          </React.Fragment>
        );
      case 'city':
        return <EditButtons />;
      default:
        return null;
    }
  };

  return (
    <li className="tree-node">
      <div className="node-content">
        <div className="is-flex is-align-items-center">
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

          {renderButtons()}
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
