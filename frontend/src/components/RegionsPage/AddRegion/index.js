import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRegion } from '../../../actions';
import FormModal from '../FormModal';

class AddRegion extends Component {
  render() {
    return (
      <FormModal
        title="Añadir Región"
        onFormSubmit={this.props.addRegion}
        formId="add-region"
        originRoute="/regions"
      />
    );
  }
}

export default connect(null, { addRegion })(AddRegion);
