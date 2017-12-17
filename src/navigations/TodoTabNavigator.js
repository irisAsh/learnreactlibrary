import React from 'react';
import { TabNavigator } from 'react-navigation';
import TodoMain from '../screens/TodoMain';

const TodoTabNavigator = TabNavigator(
  {
    TodoMainTab: {
      screen: TodoMain,
      navigationOption: {
        tabBarLabel: 'Home',
      },
    },
  },
  {
    headerMode: 'none',
  },
);

export default TodoTabNavigator;
