import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../../history';
import RouterModal from '../../shared/RouterModal';

class DeleteModal extends Component {
  renderContent() {
    return (
      <div className="content">
        <div className="icon-text is-flex is-align-items-center">
          <span className="icon is-large has-text-danger">
            <i className="fas fa-trash-alt" />
          </span>
          <span>{this.props.message}</span>
        </div>
      </div>
    );
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          className="button is-success"
          onClick={this.props.onDeleteClick}
        >
          Aceptar
        </button>
        <Link className="button is-danger" to={this.props.originRoute}>
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
