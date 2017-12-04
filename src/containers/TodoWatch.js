// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import TodoButtonsBar from '../components/TodoButtonsBar';

const HOUR_MODE = 1
const MINUT_MODE = 2

const { width, height } = Dimensions.get('window');
const watchBodyRadius = (width > height ? height : width) * 0.48;
const watchBodyLength = watchBodyRadius * 2;
const hourBoardRadius = watchBodyRadius * 0.11;
const hourBoardLength = hourBoardRadius * 2;
const hourCircumferenceRadius = watchBodyRadius * 0.82;
const minuteCircumferenceRadius = watchBodyRadius * 0.52;
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
  hour: string,
  minute: string,
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
      hour: '',
      minute: '',
    };
  }

  checkhour = (hour: string) => {
    const currentMinute = this.state.minute;
    this.setState({ hour });
    if (currentMinute === '') this.setState({ minute: '0' });
  };

  checkMinute = (minute: string) => {
    const currentHour = this.state.hour;
    this.setState({ minute });
    if (currentHour === '') this.setState({ hour: '0' });
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

  renderWatchButtons = (mode: number) => {
    var keyPre: string;
    var circumferenceRadius: number;
    var targetState: string;
    var rate: number;

    if (mode === HOUR_MODE) {
      keyPre = 'hour';
      circumferenceRadius = hourCircumferenceRadius;
      targetState = this.state.hour;
      rate = 1;
    } else {
      keyPre = 'minute';
      circumferenceRadius = minuteCircumferenceRadius;
      targetState = this.state.minute;
      rate = 5;
    }

    return Array.from(new Array(12)).map((v, i) => {
      const key = `${keyPre}${i}`;
      const rad = (i - 3) * Math.PI / 6;
      const topDistance = circumferenceRadius * Math.sin(rad);
      const leftDistance = circumferenceRadius * Math.cos(rad);
      const value = i * rate
      const checked = targetState === `${value}`;
      return (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => {
            if (mode === HOUR_MODE) {
              this.checkhour(`${value}`);
            } else {
              this.checkMinute(`${value}`);
            }
          }}
        >
          <View
            style={[
              styles.hourBoard,
              {
                top: centerDistance + topDistance,
                left: centerDistance + leftDistance,
              },
              checked && styles.checkedHourBoard,
            ]}
          >
            <Text style={checked && styles.checkedHourText}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  renderWatch = () => (
    <View style={styles.watchContainer}>
      <View style={styles.watchBody}>
        {this.renderWatchButtons(HOUR_MODE)}
        {this.renderWatchButtons(MINUT_MODE)}
      </View>
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
