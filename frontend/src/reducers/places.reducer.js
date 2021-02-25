import {
  ALL_PLACES_FETCHED,
  ADD_REGION,
  ADD_COUNTRY,
  ADD_CITY,
} from '../actions/types';

const createAssociations = (childArr, parentArr, association) => {
  childArr.forEach((childElement) => {
    const matchParentEl = parentArr.find(
      (parentEl) => parentEl.id === childElement[association]
    );

    if (!matchParentEl.children) {
      matchParentEl.children = [];
    }

    matchParentEl.children.push(childElement);
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
      return [...state, action.payload];
    case ADD_COUNTRY:
      const regionId = action.payload.regionId;
      const matchRegion = state.find((region) => region.id === regionId);

      if (!matchRegion.children) {
        matchRegion.children = [];
      }

      matchRegion.children.push(action.payload);

      return [...state];
    case ADD_CITY:
      state.forEach((region) => {
        region.children.forEach((country) => {
          if (country.id === action.payload.countryId) {
            if (!country.children) {
              country.children = [];
            }

            country.children.push(action.payload);
          }
        });
      });

      return [...state];
    default:
      return state;
  }
};

export default placesReducer;
