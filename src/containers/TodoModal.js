// @flow

import React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as todoModalActionCreators from '../actions/todoModal';

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

const TodoModal = ({
  todoModal: { visible },
  closeModal,
}: {
  todoModal: { visible: boolean },
  closeModal: any,
}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <MaterialIcons name="close" size={30} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  </Modal>
);

export default connect(
  state => ({
    todoModal: state.todoModal,
  }),
  { ...todoModalActionCreators },
)(TodoModal);
