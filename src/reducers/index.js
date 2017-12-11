import { combineReducers } from 'redux';
import todoForm from './todoForm';
import todoModal from './todoModal';
import todoSettings from './todoSettings';

const reducer = combineReducers({
  todoForm,
  todoModal,
  todoSettings,
});

export default reducer;
