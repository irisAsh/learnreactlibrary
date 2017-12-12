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
import { MODAL_MODE } from '../constants';

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
  todoTime,
  changeContext,
  openModal,
}: {
  todoContext: string,
  todoDate: string,
  todoTime: string,
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
      <TouchableWithoutFeedback onPress={() => openModal(MODAL_MODE.CALENDAR)}>
        <Octions name="calendar" size={20} />
      </TouchableWithoutFeedback>
      <TextInput
        editable={false}
        placeholder="0000/00/00"
        value={DateUtil.convertToSlashFormat(todoDate)}
      />
      <TouchableWithoutFeedback
        disabled={todoDate === ''}
        onPress={() => openModal(MODAL_MODE.CLOCK)}
      >
        <EvilIcons name="clock" size={24} color={todoDate === '' ? '#C4C4C4' : '#000000'} />
      </TouchableWithoutFeedback>
      <TextInput
        editable={false}
        placeholder="00:00"
        value={DateUtil.convertTimeToColonFormat(todoTime)}
      />
    </View>
  </ScrollView>
);

export default connect(
  state => ({
    todoContext: state.todoForm.context,
    todoDate: state.todoForm.date,
    todoTime: state.todoForm.time,
  }),
  { ...todoFormActionCreators, ...todoModalActionCreators },
)(TodoForm);
