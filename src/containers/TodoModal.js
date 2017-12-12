// @flow

import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as todoModalActionCreators from '../actions/todoModal';
import * as todoFromActionCreators from '../actions/todoForm';
import { MODAL_MODE } from '../constants';
import type { COLOR_TYPE } from '../styles/colorStyles';

import TodoCalendar from './TodoCalendar';
import TodoClock from './TodoClock';

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
  todoModal: { visible: string, mode: string },
  todoForm: { date: string, time: string },
  todoSettings: { colorStyle: COLOR_TYPE },
  closeModal: any,
  changeDate: any,
  changeTime: any,
};

class TodoModal extends Component<Props> {
  renderInnerComponent = () => {
    const { colorStyle } = this.props.todoSettings;

    switch (this.props.todoModal.mode) {
      case MODAL_MODE.CALENDAR:
        return (
          <TodoCalendar
            checkedDates={[this.props.todoForm.date]}
            monthSectionColor={colorStyle.backgroundColorDark}
            monthTextColor={colorStyle.textColorReverse}
            dateTextColor={colorStyle.textColorDefault}
            checkedDateContainerColor={colorStyle.backgroundColorDark}
            checkedDateTextColor={colorStyle.textColorReverse}
            buttonContainerColor={colorStyle.backgroundColorDark}
            buttonTextColor={colorStyle.textColorReverse}
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
      case MODAL_MODE.CLOCK: {
        const curTime = this.props.todoForm.time;
        const hour = curTime.length === 4 ? curTime.slice(0, 2) : '';
        const minute = curTime.length === 4 ? curTime.slice(-2) : '';
        return (
          <TodoClock
            {...colorStyle}
            hour={hour}
            minute={minute}
            onPressClear={() => {
              this.props.changeTime('');
              this.props.closeModal();
            }}
            onPressDecide={(time: string) => {
              this.props.changeTime(time);
              this.props.closeModal();
            }}
          />
        );
      }
      default:
        return null;
    }
  };

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
    todoSettings: state.todoSettings,
  }),
  { ...todoModalActionCreators, ...todoFromActionCreators },
)(TodoModal);
