// @flow

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

const TodoButtonsBar = ({
  buttons,
}: {
  buttons: Array<{
    name: string,
    onPress: () => void,
    buttonContainerColor: string,
    buttonTextColor: string,
  }>,
}) => (
  <View style={styles.container}>
    {buttons.map(button => (
      <TouchableWithoutFeedback key={button.name} onPress={() => button.onPress()}>
        <View style={[styles.buttonContainer, { backgroundColor: button.buttonContainerColor }]}>
          <Text style={[styles.buttonText, { color: button.buttonTextColor }]}>{button.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ))}
  </View>
);

export default TodoButtonsBar;
