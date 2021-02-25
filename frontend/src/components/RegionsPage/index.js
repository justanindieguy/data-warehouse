import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPlaces } from '../../actions';
import TreeView from './TreeView';
import './styles.scss';

class RegionsPage extends Component {
  componentDidMount() {
    this.props.fetchAllPlaces();
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

          {this.props.places === null ? (
            <div>Loading...</div>
          ) : (
            <TreeView data={this.props.places} />
          )}
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
})(RegionsPage);
