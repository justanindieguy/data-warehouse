import React, { Component } from 'react';
import { connect } from 'react-redux';
import RouterModal from '../../shared/RouterModal';
import EditForm from '../FormModal/EditForm';
import Actions from '../FormModal/Actions';
import { editCity } from '../../../actions';
import history from '../../../history';
import api from '../../../apis/localApi';

class EditCity extends Component {
  state = { city: null };

  componentDidMount() {
    this.fetchCity();
  }

  async fetchCity() {
    const { id } = this.props.match.params;
    const { data } = await api.get(`/cities/${id}`);

    this.setState({ city: data });
  }

  renderContent() {
    if (!this.state.city) {
      return <div>Loading...</div>;
    }

    return (
      <EditForm
        onFormSubmit={this.props.editCity}
        formId="edit-city"
        initialNameValue={this.state.city.name}
        renderOptions={this.renderOptions}
        selectName="countryId"
        selectLabel="País"
        defaultSelectValue={this.state.city.country}
        foreignKeyId={this.props.match.params.id}
        foreignKeyName="cityId"
      />
    );
  }

  renderOptions = () => {
    if (!this.state.city) {
      return null;
    }

    const sameRegionCountries = this.props.countries.filter(
      (country) => country.region === this.state.city.region
    );

    return sameRegionCountries.map((country) => (
      <option value={country.id} key={country.id}>
        {country.name}
      </option>
    ));
  };

  renderActions() {
    return <Actions formId="edit-city" originRoute="/regions" />;
  }

  render() {
    return (
      <RouterModal
        title="Editar Ciudad"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/regions')}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { countries: state.countries };
};

export default connect(mapStateToProps, { editCity })(EditCity);
