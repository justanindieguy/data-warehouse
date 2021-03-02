import _ from 'lodash';
import {
  ALL_PLACES_FETCHED,
  ADD_REGION,
  ADD_COUNTRY,
  DELETE_COUNTRY,
  EDIT_COUNTRY,
  ADD_CITY,
  EDIT_CITY,
  DELETE_CITY,
  CLEAR_PLACES,
} from '../actions/types';

const createAssociations = (childArr, parentArr, association) => {
  childArr.forEach((childElement) => {
    const matchParentEl = parentArr.find(
      (parentEl) => parentEl.id === childElement[association]
    );

    if (!matchParentEl.children) {
      matchParentEl.children = [];
    }

    matchParentEl.children = [...matchParentEl.children, childElement];
  });
};

const placesReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_PLACES_FETCHED:
      const { regions, countries, cities } = action.payload;

      createAssociations(cities, countries, 'country');
      createAssociations(countries, regions, 'region');

      return [...regions];
    case ADD_REGION:
      return _.sortBy([...state, action.payload], (region) => region.name);
    case ADD_COUNTRY:
      const regionId = action.payload.regionId;
      const matchRegion = state.find((region) => region.id === regionId);

      if (!matchRegion.children) {
        matchRegion.children = [];
      }

      matchRegion.children = _.sortBy(
        [...matchRegion.children, action.payload],
        (country) => country.name
      );

      return [...state];
    case EDIT_COUNTRY:
      state.forEach((region) => {
        if (region.children) {
          region.children = region.children.filter(
            (country) => country.id !== parseInt(action.payload.id)
          );
        }

        if (region.id === action.payload.region) {
          if (!region.children) {
            region.children = [];
          }

          region.children = _.sortBy(
            [...region.children, action.payload],
            (country) => country.name
          );
        }
      });

      return [...state];
    case DELETE_COUNTRY:
      state.forEach((region) => {
        if (region.children) {
          region.children = region.children.filter(
            (country) => country.id !== parseInt(action.payload)
          );
        }
      });

      return [...state];
    case ADD_CITY:
      state.forEach((region) => {
        if (!region.children) {
          return;
        }

        region.children.forEach((country) => {
          if (country.id === action.payload.countryId) {
            if (!country.children) {
              country.children = [];
            }

            country.children = _.sortBy(
              [...country.children, action.payload],
              (city) => city.name
            );
          }
        });
      });

      return [...state];
    case EDIT_CITY:
      state.forEach((region) => {
        if (region.children) {
          region.children.forEach((country) => {
            if (!country.children) {
              country.children = [];
            }

            country.children = country.children.filter(
              (city) => city.id !== parseInt(action.payload.id)
            );

            if (country.id === action.payload.country) {
              country.children = _.sortBy(
                [...country.children, action.payload],
                (city) => city.name
              );
            }
          });
        }
      });

      return state;
    case DELETE_CITY:
      state.forEach((region) => {
        if (region.children) {
          region.children.forEach((country) => {
            if (country.children) {
              country.children = country.children.filter(
                (city) => city.id !== parseInt(action.payload)
              );
            }
          });
        }
      });

      return [...state];
    case CLEAR_PLACES:
      return [];
    default:
      return state;
  }
};

export default placesReducer;
