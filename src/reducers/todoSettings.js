import { TODO_SETTINGS } from '../constants/actionTypes';
import * as colorStyles from '../styles/colorStyles';

const initialState = {
  colorStyle: colorStyles.SKYBLUE_STYLE,
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
