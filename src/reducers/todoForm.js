// @flow

import { TODO_FORM } from '../constants/actionTypes';

export type TODO_FORM_STATE_TYPE = {
  title: string,
  context: string,
  date: string,
  time: string,
  todos: Array<{
    title: string,
    context: string,
    date: string,
    time: string,
  }>,
};

const initialState: TODO_FORM_STATE_TYPE = {
  title: '',
  context: '',
  date: '',
  time: '',
  todos: [],
};

const todoForm = (state: TODO_FORM_STATE_TYPE = initialState, action: any) => {
  switch (action.type) {
    case TODO_FORM.CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
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
      const {
        title, context, date, time,
      } = state;
      return {
        ...state,
        title: '',
        context: '',
        date: '',
        time: '',
        todos: [
          ...state.todos,
          {
            title,
            context,
            date,
            time,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export default todoForm;
