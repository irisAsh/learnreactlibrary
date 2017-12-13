// @flow

import { TODO_FORM } from '../constants/actionTypes';

export const changeTitle = (title: string) => ({
  type: TODO_FORM.CHANGE_TITLE,
  title,
});

export const changeContext = (context: string) => ({
  type: TODO_FORM.CHANGE_CONTEXT,
  context,
});

export const changeDate = (date: string) => ({
  type: TODO_FORM.CHANGE_DATE,
  date,
});

export const changeTime = (time: string) => ({
  type: TODO_FORM.CHANGE_TIME,
  time,
});
