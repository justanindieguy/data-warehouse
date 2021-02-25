import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormModal from '../FormModal';
import { addCountry } from '../../../actions';

class AddCountry extends Component {
  state = { id: parseInt(this.props.match.params.id) };

  render() {
    return (
      <FormModal
        title="Añadir País"
        onFormSubmit={this.props.addCountry}
        formId="add-country"
        originRoute="/regions"
        foreignKeyId={this.state.id}
        foreignKeyName="regionId"
      />
    );
  }
}

export default connect(null, { addCountry })(AddCountry);
