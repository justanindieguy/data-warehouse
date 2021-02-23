import _ from 'lodash';
import api from '../apis/localApi';
import { FETCH_REGIONS, FETCH_COUNTRIES, FETCH_CITIES } from './types';

export const fetchAllPlaces = () => async (dispatch, getState) => {
  await dispatch(fetchRegions());

  const uniqRegions = _.chain(getState().regions).map('id').uniq().value();

  await Promise.all(
    uniqRegions.map((regionId) => {
      return dispatch(fetchCountries(regionId));
    })
  );

  const countries = getState().countries;
  for (let regionId in countries) {
    const regionCountries = countries[regionId];
    const uniqCountries = _.chain(regionCountries).map('id').uniq().value();

    await Promise.all(
      uniqCountries.map((countryId) => {
        return dispatch(fetchCities(countryId));
      })
    );
  }
};

export const fetchRegions = () => async (dispatch) => {
  const { data } = await api.get('/regions');

  const regions = _.keyBy(data, (region) => {
    return region.id;
  });

  dispatch({ type: FETCH_REGIONS, payload: regions });
};

export const fetchCountries = (regionId) => async (dispatch) => {
  const countries = {};

  try {
    const { data } = await api.get('/countries', { params: { regionId } });
    countries[regionId] = data;
  } catch (err) {
    if (err.response.status === 404) {
      countries[regionId] = [];
    }
  }

  dispatch({ type: FETCH_COUNTRIES, payload: countries });
};

export const fetchCities = (countryId) => async (dispatch) => {
  const cities = {};

  try {
    const { data } = await api.get('/cities', { params: { countryId } });
    cities[countryId] = data;
  } catch (err) {
    if (err.response.status === 404) {
      cities[countryId] = [];
    }
  }

  dispatch({ type: FETCH_CITIES, payload: cities });
};
