import React, { Component } from 'react';
import ModalForm from './ModalForm';
import Actions from './Actions';
import history from '../../../history';
import RouterModal from '../../shared/RouterModal';

class FormModal extends Component {
  renderContent() {
    return (
      <ModalForm
        onFormSubmit={this.props.onFormSubmit}
        formId={this.props.formId}
        foreignKeyId={this.props.foreignKeyId}
        foreignKeyName={this.props.foreignKeyName}
      />
    );
  }

  renderActions() {
    return (
      <Actions
        formId={this.props.formId}
        originRoute={this.props.originRoute}
      />
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

export default FormModal;
