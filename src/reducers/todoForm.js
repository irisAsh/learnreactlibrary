import { TODO_FORM } from '../constants/actionTypes';

const initialState = {
  context: '',
  date: '',
};

const todoForm = (state = initialState, action) => {
  switch (action.type) {
    case TODO_FORM.CHANGE_CONTEXT:
      return {
        ...state,
        context: action.context,
      };
    case TODO_FORM.CHANGE_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
};

export default todoForm;
