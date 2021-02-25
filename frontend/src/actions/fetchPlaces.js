import _ from 'lodash';
import api from '../apis/localApi';
import {
  FETCH_REGIONS,
  FETCH_COUNTRIES,
  FETCH_CITIES,
  ALL_PLACES_FETCHED,
} from './types';

export const fetchAllPlaces = () => async (dispatch, getState) => {
  await dispatch(fetchRegions());

  const uniqRegions = _.chain(getState().fetchedRegions)
    .map('id')
    .uniq()
    .value();

  await Promise.all(
    uniqRegions.map((regionId) => dispatch(fetchCountries(regionId)))
  );

  const countries = getState().fetchedCountries;

  const uniqCountries = _.chain(countries).map('id').uniq().value();

  await Promise.all(
    uniqCountries.map((countryId) => dispatch(fetchCities(countryId)))
  );

  dispatch({
    type: ALL_PLACES_FETCHED,
    payload: {
      regions: getState().fetchedRegions,
      countries: getState().fetchedCountries,
      cities: getState().fetchedCities,
    },
  });
};

export const fetchRegions = () => async (dispatch) => {
  const { data } = await api.get('/regions');
  dispatch({ type: FETCH_REGIONS, payload: data });
};

export const fetchCountries = (regionId) => async (dispatch) => {
  let countries;

  try {
    const { data } = await api.get('/countries', { params: { regionId } });
    countries = data;
  } catch (err) {
    if (err.response.status === 404) {
      countries = [];
    }
  }

  dispatch({ type: FETCH_COUNTRIES, payload: countries });
};

export const fetchCities = (countryId) => async (dispatch) => {
  let cities;

  try {
    const { data } = await api.get('/cities', { params: { countryId } });
    cities = data;
  } catch (err) {
    cities = [];
  }

  dispatch({ type: FETCH_CITIES, payload: cities });
};
