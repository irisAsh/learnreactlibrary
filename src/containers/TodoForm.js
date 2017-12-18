// @flow

import React, { Component } from 'react';
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
import TodoButtonsBar from '../components/TodoButtonsBar';
import * as DateUtil from '../utils/DateUtil';
import { MODAL_MODE } from '../constants';
import type { COLOR_TYPE } from '../styles/colorStyles';
import type { TODO_FORM_STATE_TYPE } from '../reducers/todoForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    borderBottomWidth: 1,
  },
  todoContext: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  todoDateConteiner: {
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: 120,
    paddingHorizontal: 4,
  },
});

type Props = {
  todoForm: TODO_FORM_STATE_TYPE,
  todoSettings: { colorStyle: COLOR_TYPE },
  changeTitle: any,
  changeContext: any,
  registerTodo: any,
  openModal: any,
};

class TodoForm extends Component<Props> {
  renderButtonsBar = () => {
    const { colorStyle }: { colorStyle: COLOR_TYPE } = this.props.todoSettings;
    const buttonBase = {
      buttonContainerColor: colorStyle.backgroundColorDark,
      buttonTextColor: colorStyle.textColorReverse,
    };

    const buttons = [
      {
        name: 'クリア',
        onPress: () => {},
        ...buttonBase,
      },
      {
        name: '決定',
        onPress: () => {
          this.props.registerTodo();
        },
        ...buttonBase,
      },
    ];

    return <TodoButtonsBar buttons={buttons} />;
  };

  render() {
    const { todoForm } = this.props;
    return (
      <ScrollView>
        {this.renderButtonsBar()}
        <View style={styles.todoDateConteiner}>
          <TouchableWithoutFeedback onPress={() => this.props.openModal(MODAL_MODE.CALENDAR)}>
            <Octions name="calendar" size={20} />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.textInput}
            maxLength={10}
            editable={false}
            placeholder="0000/00/00"
            value={DateUtil.convertToSlashFormat(todoForm.date)}
          />
          <TouchableWithoutFeedback
            disabled={todoForm.date === ''}
            onPress={() => this.props.openModal(MODAL_MODE.CLOCK)}
          >
            <EvilIcons
              name="clock"
              size={24}
              color={todoForm.date === '' ? '#C4C4C4' : '#000000'}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.textInput}
            maxLength={5}
            editable={false}
            placeholder="00:00"
            value={DateUtil.convertTimeToColonFormat(todoForm.time)}
          />
        </View>
        <TextInput
          style={styles.todoTitle}
          maxLength={40}
          placeholder="Title"
          value={todoForm.title}
          onChangeText={text => this.props.changeTitle(text)}
        />
        <TextInput
          style={styles.todoContext}
          multiline
          placeholder="ToDo"
          value={todoForm.context}
          onChangeText={text => this.props.changeContext(text)}
        />
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    todoForm: state.todoForm,
    todoSettings: state.todoSettings,
  }),
  { ...todoFormActionCreators, ...todoModalActionCreators },
)(TodoForm);
