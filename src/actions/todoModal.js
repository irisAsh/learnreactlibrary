// @flow

import { TODO_MODAL } from '../constants/actionTypes';

export const openModal = () => ({
  type: TODO_MODAL.OPEN_MODAL,
});

export const closeModal = () => ({
  type: TODO_MODAL.CLOSE_MODAL,
});
