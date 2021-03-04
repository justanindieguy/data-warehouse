import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPlaces, clearPlaces } from '../../actions';
import TreeView from './TreeView';
import NoResults from '../shared/NoResults';
import './styles.scss';

class RegionsPage extends Component {
  componentDidMount() {
    this.props.fetchAllPlaces();
  }

  componentWillUnmount() {
    this.props.clearPlaces();
  }

  renderContent() {
    if (!this.props.places) {
      return <div>Loading...</div>;
    }

    if (this.props.places.length === 0) {
      return (
        <NoResults
          icon="fa-globe-americas"
          message="Intenta añadiendo una región."
        />
      );
    }

    return <TreeView data={this.props.places} />;
  }

  render() {
    return (
      <div className="container is-widescreen">
        <div className="content">
          <Link
            className="button is-link is-outlined is-to-the-right"
            to="/regions/region/add"
          >
            Añadir Región
          </Link>
          <hr />

          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places,
  };
};

export default connect(mapStateToProps, {
  fetchAllPlaces,
  clearPlaces,
})(RegionsPage);
