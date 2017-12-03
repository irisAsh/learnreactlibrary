// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import TodoButtonsBar from '../components/TodoButtonsBar';

const { width, height } = Dimensions.get('window');
const watchBodyRadius = (width > height ? height : width) * 0.45;
const watchBodyLength = watchBodyRadius * 2;
const hourBoardRadius = watchBodyRadius * 0.12;
const hourBoardLength = hourBoardRadius * 2;
const hourCircumferenceRadius = watchBodyRadius * 0.82;
const centerDistance = watchBodyRadius - hourBoardRadius;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchBody: {
    height: watchBodyLength,
    width: watchBodyLength,
    borderRadius: watchBodyLength,
    backgroundColor: '#FFE2EF',
  },
  hourBoard: {
    position: 'absolute',
    height: hourBoardLength,
    width: hourBoardLength,
    borderRadius: hourBoardLength,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  hourText: {
    color: '#000000',
  },
  checkedHourBoard: {
    backgroundColor: '#FF5990',
  },
  checkedHourText: {
    color: '#FFFFFF',
  },
});

type Props = {
  buttonContainerColor: string,
  buttonTextColor: string,
  onPressClear: () => void,
  onPressDecide: () => void,
};

type State = {
  hour: number,
  minute: number,
};

class TodoWatch extends Component<Props, State> {
  static defaultProps = {
    buttonContainerColor: '#7C7C7C',
    buttonTextColor: '#FFFFFF',
    onPressClear: () => {},
    onPressDecide: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
    };
  }

  renderButtonsBar = () => {
    const buttonsBase = {
      buttonContainerColor: this.props.buttonContainerColor,
      buttonTextColor: this.props.buttonTextColor,
    };
    const buttons = [
      {
        ...buttonsBase,
        name: 'クリア',
        onPress: this.props.onPressClear,
      },
      {
        ...buttonsBase,
        name: '決定',
        onPress: this.props.onPressDecide,
      },
    ];

    return <TodoButtonsBar buttons={buttons} />;
  };

  renderHourButtons = () =>
    Array.from(new Array(12)).map((v, i) => {
      const hourKey = `hour${i}`;
      const rad = (i - 3) * Math.PI / 6;
      const topDistance = hourCircumferenceRadius * Math.sin(rad);
      const leftDistance = hourCircumferenceRadius * Math.cos(rad);
      const checked = this.state.hour === i;
      return (
        <View
          key={hourKey}
          style={[
            styles.hourBoard,
            {
              top: centerDistance + topDistance,
              left: centerDistance + leftDistance,
            },
            checked && styles.checkedHourBoard,
          ]}
        >
          <Text style={checked && styles.checkedHourText}>{i}</Text>
        </View>
      );
    });

  renderWatch = () => (
    <View style={styles.watchContainer}>
      <View style={styles.watchBody}>{this.renderHourButtons()}</View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderButtonsBar()}
        {this.renderWatch()}
      </View>
    );
  }
}

export default TodoWatch;
