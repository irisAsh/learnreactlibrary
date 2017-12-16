import { TODO_FORM } from '../constants/actionTypes';

const initialState = {
  context: '',
  date: '',
  time: '',
  todos: [],
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
        time: action.date === '' ? '' : state.time,
      };
    case TODO_FORM.CHANGE_TIME:
      return {
        ...state,
        time: action.time,
      };
    case TODO_FORM.REGISTER_TODO: {
      const { context, date, time } = state;
      return {
        ...state,
        context: '',
        date: '',
        time: '',
        todos: [...state.todos, { context, date, time }],
      };
    }
    default:
      return state;
  }
};

export default todoForm;
