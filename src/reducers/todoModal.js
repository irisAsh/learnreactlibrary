import { TODO_MODAL } from '../constants/actionTypes';

const initialState = {
  visible: false,
};

const todoModal = (state = initialState, action) => {
  switch (action.type) {
    case TODO_MODAL.OPEN_MODAL:
      return {
        ...state,
        visible: true,
      };
    case TODO_MODAL.CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default todoModal;
