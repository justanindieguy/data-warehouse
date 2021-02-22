import { TOGGLE_MODAL_OPEN, OPEN_MODAL, CLOSE_MODAL } from './types';

export const toggleModal = () => {
  return { type: TOGGLE_MODAL_OPEN };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const openModal = () => {
  return { type: OPEN_MODAL };
};
