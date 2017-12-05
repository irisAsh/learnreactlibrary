// @flow

import { TODO_MODAL } from '../constants/actionTypes';

export const openModal = (mode: string) => ({
  type: TODO_MODAL.OPEN_MODAL,
  mode,
});

export const closeModal = () => ({
  type: TODO_MODAL.CLOSE_MODAL,
});
