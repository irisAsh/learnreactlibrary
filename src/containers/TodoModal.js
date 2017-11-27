// @flow

import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as todoModalActionCreators from '../actions/todoModal';
import * as todoFromActionCreators from '../actions/todoForm';

import TodoCalendar from './TodoCalendar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type Props = {
  todoModal: { visible: string },
  todoForm: { date: string },
  closeModal: any,
  changeDate: any,
};

class TodoModal extends Component<Props> {
  renderInnerComponent = () => (
    <TodoCalendar
      checkedDates={[this.props.todoForm.date]}
      monthSectionColor="#FF5990"
      monthTextColor="#FFFFFF"
      dateTextColor="#000000"
      checkedDateContainerColor="#FF5990"
      checkedDateTextColor="#FFFFFF"
      buttonContainerColor="#FF5990"
      buttonTextColor="#FFFFFF"
      onPressClear={() => {
        this.props.changeDate('');
        this.props.closeModal();
      }}
      onPressDecide={(checkedDates: Array<string>) => {
        this.props.changeDate(!!checkedDates && checkedDates.length > 0 ? checkedDates[0] : '');
        this.props.closeModal();
      }}
    />
  );

  render() {
    const { todoModal: { visible }, closeModal } = this.props;

    const ModalComponent = this.renderInnerComponent();

    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.container}>
          <View style={styles.topBarContainer}>
            <TouchableWithoutFeedback onPress={() => closeModal()}>
              <MaterialIcons name="close" size={30} />
            </TouchableWithoutFeedback>
          </View>
          {ModalComponent}
        </View>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    todoModal: state.todoModal,
    todoForm: state.todoForm,
  }),
  { ...todoModalActionCreators, ...todoFromActionCreators },
)(TodoModal);
