// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoForm from '../containers/TodoForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
});

const TodoMain = () => (
  <View style={styles.container}>
    <TodoForm />
  </View>
);

export default TodoMain;
