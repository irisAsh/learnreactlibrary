// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FF5990',
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

const TodoHeader = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default TodoHeader;
