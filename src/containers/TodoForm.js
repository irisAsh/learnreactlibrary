// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Octions from 'react-native-vector-icons/Octicons';
import * as todoFormActionCreators from '../actions/todoForm';
import TodoFormBar from './TodoFormBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoContext: {
    fontSize: 20,
    marginTop: 4,
  },
  todoDateConteiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const TodoForm = ({
  todoContext,
  todoDate,
  changeContext,
  changeDate,
}: {
  todoContext: string,
  todoDate: string,
  changeContext: any,
  changeDate: any,
}) => (
  <ScrollView>
    <TodoFormBar />
    <TextInput
      style={styles.todoContext}
      multiline
      placeholder="ToDo"
      value={todoContext}
      onChange={({ text }) => changeContext(text)}
    />
    <View style={styles.todoDateConteiner}>
      <Text>日時</Text>
      <TouchableWithoutFeedback onPress={() => changeDate('2017/11/20')}>
        <Octions name="calendar" size={20} />
      </TouchableWithoutFeedback>
      <Text>{todoDate}</Text>
    </View>
  </ScrollView>
);

export default connect(
  state => ({
    todoContext: state.todoForm.context,
    todoDate: state.todoForm.date,
  }),
  { ...todoFormActionCreators },
)(TodoForm);
