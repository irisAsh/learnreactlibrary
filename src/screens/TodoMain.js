// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import TodoHeader from '../components/TodoHeader';
import TodoForm from '../containers/TodoForm';
import TodoModal from '../containers/TodoModal';
import * as todoSettingsActionCreators from '../actions/todoSettings';
import type { COLOR_TYPE } from '../styles/colorStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const TodoMain = ({
  todoSettings: { colorStyle },
}: {
  todoSettings: { colorStyle: COLOR_TYPE },
}) => (
  <View style={styles.container}>
    <TodoHeader
      title="Todo"
      backgroundColor={colorStyle.backgroundColorDark}
      color={colorStyle.textColorReverse}
    />
    <TodoForm />
    <TodoModal />
  </View>
);

export default connect(
  state => ({
    todoSettings: state.todoSettings,
  }),
  { ...todoSettingsActionCreators },
)(TodoMain);
