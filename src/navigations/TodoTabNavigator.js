// @flow

import React, { ReactElement } from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoMain from '../screens/TodoMain';
import TodoList from '../screens/TodoList';

const renderTabBarIcon = (Icon: ReactElement, color: string, name: string, size: number) => (
  <Icon color={color} name={name} size={size} />
);

const TodoTabNavigator = TabNavigator(
  {
    TodoListTab: {
      screen: TodoList,
      navigationOptions: {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) =>
          renderTabBarIcon(MaterialCommunityIcons, tintColor, 'format-list-numbers', 24),
      },
    },
    TodoMainTab: {
      screen: TodoMain,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) =>
          renderTabBarIcon(MaterialCommunityIcons, tintColor, 'plus-outline', 24),
      },
    },
  },
  {
    headerMode: 'none',
  },
);

export default TodoTabNavigator;
