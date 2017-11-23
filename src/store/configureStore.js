import { createStore } from 'redux';
import reducer from '../reducers';

const configreStore = () => {
  const store = createStore(reducer);
  return store;
};

export default configreStore;
