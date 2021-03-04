import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';
import RouterModal from '../../shared/RouterModal';

class DeleteModal extends Component {
  renderContent() {
    return <div className="content">{this.props.content}</div>;
  }

  renderActions() {
    return (
      <React.Fragment>
        <button className="button is-danger" onClick={this.props.onDeleteClick}>
          Eliminar
        </button>
        <Link
          className="button is-link is-outlined"
          to={this.props.originRoute}
        >
          Cancelar
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <RouterModal
        title={this.props.title}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(this.props.originRoute)}
      />
    );
  }
}

export default DeleteModal;
