// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as todoFormActionCreators from '../actions/todoForm';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const TodoFormBar = () => (
  <View style={styles.container}>
    <TouchableWithoutFeedback>
      <MaterialIcons name="add-circle" size={20} />
    </TouchableWithoutFeedback>
  </View>
);

export default connect(null, { ...todoFormActionCreators })(TodoFormBar);
