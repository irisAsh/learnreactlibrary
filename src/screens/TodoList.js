// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TodoHeader from '../components/TodoHeader';
import type { COLOR_TYPE } from '../styles/colorStyles';
import type { TODO_FORM_STATE_TYPE } from '../reducers/todoForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

const TodoList = ({
  todoForm,
  todoSettings: { colorStyle },
}: {
  todoForm: TODO_FORM_STATE_TYPE,
  todoSettings: { colorStyle: COLOR_TYPE },
}) => (
  <View style={styles.container}>
    <TodoHeader
      title="Todo"
      backgroundColor={colorStyle.backgroundColorDark}
      color={colorStyle.textColorReverse}
    />
    {todoForm.todos.map((todo, index) => {
      const key = `TODO${index}`;
      return (
        <View key={key}>
          <Text>{todo.context}</Text>
        </View>
      );
    })}
  </View>
);

export default connect(
  state => ({
    todoForm: state.todoForm,
    todoSettings: state.todoSettings,
  }),
  null,
)(TodoList);
