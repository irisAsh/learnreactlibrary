import { TODO_SETTINGS } from '../constants/actionTypes';
import * as colorTypes from '../styles/colorTypes';

const initialState = {
  color: colorTypes.SKYBLUE_STYLE,
};

const todoSettings = (state = initialState, action) => {
  switch (action.type) {
    case TODO_SETTINGS.SET_COLOR:
      return state;
    default:
      return state;
  }
};

export default todoSettings;
