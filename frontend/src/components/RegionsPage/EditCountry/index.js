import React, { Component } from 'react';
import { connect } from 'react-redux';
import RouterModal from '../../shared/RouterModal';
import EditForm from '../FormModal/EditForm';
import Actions from '../FormModal/Actions';
import { editCountry } from '../../../actions';
import history from '../../../history';
import api from '../../../apis/localApi';

class EditCountry extends Component {
  state = { country: null };

  componentDidMount() {
    this.fetchCountry();
  }

  async fetchCountry() {
    const { id } = this.props.match.params;
    const { data } = await api.get(`/countries/${id}`);

    this.setState({ country: data });
  }

  renderContent() {
    if (!this.state.country) {
      return <div>Loading...</div>;
    }

    return (
      <EditForm
        onFormSubmit={this.props.editCountry}
        formId="edit-country"
        initialNameValue={this.state.country.name}
        renderOptions={this.renderOptions}
        selectName="regionId"
        selectLabel="Región"
        defaultSelectValue={this.state.country.region}
        foreignKeyId={this.props.match.params.id}
        foreignKeyName="countryId"
      />
    );
  }

  renderOptions = () => {
    return this.props.regions.map((region) => (
      <option value={region.id} key={region.id}>
        {region.name}
      </option>
    ));
  };

  renderActions() {
    return <Actions formId="edit-country" originRoute="/regions" />;
  }

  render() {
    return (
      <RouterModal
        title="Editar País"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/regions')}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { regions: state.regions };
};

export default connect(mapStateToProps, { editCountry })(EditCountry);
