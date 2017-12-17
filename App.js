// @flow

import React from 'react';
import { Provider } from 'react-redux';
import configreStore from './src/store/configureStore';
import TodoAppNavigator from './src/navigations/TodoAppNavigator';

const App = () => (
  <Provider store={configreStore()}>
    <TodoAppNavigator />
  </Provider>
);

export default App;
