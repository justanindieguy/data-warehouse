import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormModal from '../FormModal';
import { addCity } from '../../../actions';

class AddCity extends Component {
  state = { id: parseInt(this.props.match.params.id) };

  render() {
    return (
      <FormModal
        title="Añadir Ciudad"
        onFormSubmit={this.props.addCity}
        formId="add-city"
        originRoute="/regions"
        foreignKeyId={this.state.id}
        foreignKeyName="countryId"
      />
    );
  }
}

export default connect(null, { addCity })(AddCity);
