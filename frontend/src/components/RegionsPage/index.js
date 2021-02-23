import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchAllPlaces } from '../../actions';
import TreeView from '../shared/TreeView';
import './styles.scss';

class RegionsPage extends Component {
  state = { parsedPlaces: [] };

  async componentDidMount() {
    await this.props.fetchAllPlaces();
    this.parsePlaces();
  }

  parsePlaces() {
    const { regions, countries, cities } = this.props;

    if (!regions || !countries || !cities) {
      return;
    }

    for (let regionId in countries) {
      regions[regionId].children = countries[regionId];
    }

    const sortedRegions = _.sortBy(Object.values(regions), [
      (region) => {
        return region.name;
      },
    ]);

    for (let region of sortedRegions) {
      for (let country of region.children) {
        if (cities[country.id]) {
          country.children = cities[country.id];
        }
      }
    }

    this.setState({ parsedPlaces: sortedRegions });
  }

  render() {
    if (!this.state.parsedPlaces) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container is-widescreen">
        <div className="content">
          <button className="button is-link">Agregar Región</button>
          <TreeView data={Object.values(this.state.parsedPlaces)} />
        </div>
      </div>
    );
  }
}

const sortProp = (obj) => {
  const sortedProp = {};

  for (let propId in obj) {
    sortedProp[propId] = _.sortBy(obj[propId], [(entry) => entry.name]);
  }

  return sortedProp;
};

const mapStateToProps = (state) => {
  const { regions, countries, cities } = state;
  return { regions, countries: sortProp(countries), cities: sortProp(cities) };
};

export default connect(mapStateToProps, { fetchAllPlaces })(RegionsPage);
