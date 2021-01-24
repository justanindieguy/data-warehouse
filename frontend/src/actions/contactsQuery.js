import { SET_ROWS_LIMIT, SET_SORT_BY, SET_OFFSET } from './types';

export const changeRowsPerPage = (value) => {
  return { type: SET_ROWS_LIMIT, payload: value };
};

export const changeSortBy = (sortByValue) => {
  return { type: SET_SORT_BY, payload: sortByValue };
};

export const changeOffset = (goToNextPage) => {
  return { type: SET_OFFSET, payload: goToNextPage };
};
