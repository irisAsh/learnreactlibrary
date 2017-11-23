import { combineReducers } from 'redux';
import todoForm from './todoForm';
import todoModal from './todoModal';

const reducer = combineReducers({
  todoForm,
  todoModal,
});

export default reducer;
