// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoHeader from './TodoHeader';
import TodoForm from '../containers/TodoForm';
import TodoModal from '../containers/TodoModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const TodoMain = () => (
  <View style={styles.container}>
    <TodoHeader title="Todo" />
    <TodoForm />
    <TodoModal />
  </View>
);

export default TodoMain;
