// @flow

import { TODO_FORM } from '../constants/actionTypes';

export const changeContext = (context: string) => ({
  type: TODO_FORM.CHANGE_CONTEXT,
  context,
});

export const changeDate = (date: string) => ({
  type: TODO_FORM.CHANGE_DATE,
  date,
});
