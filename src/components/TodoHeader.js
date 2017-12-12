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

const TodoHeader = ({
  title,
  backgroundColor,
  color,
}: {
    title: string,
    backgroundColor: string,
    color: string,
  } = {
    title: 'Title',
    backgroundColor: '#595959',
    color: '#FFFFFF',
  }) => (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color }]}>{title}</Text>
    </View>
);

export default TodoHeader;
