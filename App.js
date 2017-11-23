// @flow

import React from 'react';
import { Provider } from 'react-redux';
import configreStore from './src/store/configureStore';
import TodoMain from './src/components/TodoMain';

const App = () => (
  <Provider store={configreStore()}>
    <TodoMain />
  </Provider>
);

export default App;
