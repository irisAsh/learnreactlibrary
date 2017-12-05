import { TODO_MODAL } from '../constants/actionTypes';
import { MODAL_MODE } from '../constants';

const initialState = {
  visible: false,
  mode: MODAL_MODE.INIT,
};

const todoModal = (state = initialState, action) => {
  switch (action.type) {
    case TODO_MODAL.OPEN_MODAL:
      return {
        ...state,
        visible: true,
        mode: action.mode,
      };
    case TODO_MODAL.CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default todoModal;
