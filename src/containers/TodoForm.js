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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as todoFormActionCreators from '../actions/todoForm';
import * as todoModalActionCreators from '../actions/todoModal';
import TodoFormBar from './TodoFormBar';
import * as DateUtil from '../utils/DateUtil';

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
  openModal,
}: {
  todoContext: string,
  todoDate: string,
  changeContext: any,
  openModal: any,
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
      <TouchableWithoutFeedback onPress={() => openModal()}>
        <Octions name="calendar" size={20} />
      </TouchableWithoutFeedback>
      <TextInput
        editable={false}
        placeholder="0000/00/00"
        value={DateUtil.convertToSlashFormat(todoDate)}
      />
      <TouchableWithoutFeedback>
        <EvilIcons name="clock" size={24} />
      </TouchableWithoutFeedback>
      <TextInput editable={false} placeholder="00:00" />
    </View>
  </ScrollView>
);

export default connect(
  state => ({
    todoContext: state.todoForm.context,
    todoDate: state.todoForm.date,
  }),
  { ...todoFormActionCreators, ...todoModalActionCreators },
)(TodoForm);
