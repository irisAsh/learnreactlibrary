// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import TodoButtonsBar from '../components/TodoButtonsBar';

const HOUR_MODE = 1;
const MINUT_MODE = 2;

const { width, height } = Dimensions.get('window');
const clockBodyRadius = (width > height ? height : width) * 0.48;
const clockBodyLength = clockBodyRadius * 2;
const innerBodyRadius = clockBodyRadius * 0.36;
const innerBodyLength = innerBodyRadius * 2;
const hourBoardRadius = clockBodyRadius * 0.11;
const hourBoardLength = hourBoardRadius * 2;
const hourCircumferenceRadius = clockBodyRadius * 0.82;
const minuteCircumferenceRadius = clockBodyRadius * 0.52;
const centerDistance = clockBodyRadius - hourBoardRadius;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockBody: {
    height: clockBodyLength,
    width: clockBodyLength,
    borderRadius: clockBodyLength,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBody: {
    height: innerBodyLength,
    width: innerBodyLength,
    borderRadius: innerBodyLength,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchBoard: {
    position: 'absolute',
    height: hourBoardLength,
    width: hourBoardLength,
    borderRadius: hourBoardLength,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ampmText: {
    fontSize: 30,
    paddingVertical: 12,
  },
  checkedAmpmText: {
    fontWeight: 'bold',
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  displayTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 48,
    paddingVertical: 16,
  },
});

type Props = {
  backgroundColorLight: string,
  backgroundColorDark: string,
  textColorDefault: string,
  textColorReverse: string,
  textColorDark: string,
  textColorLight: string,
  onPressClear: () => void,
  onPressDecide: (time: string) => void,
};

type State = {
  hour: string,
  minute: string,
  amMode: boolean,
};

const initialState = {
  hour: '',
  minute: '',
  amMode: true,
}

class TodoClock extends Component<Props, State> {
  static defaultProps = {
    backgroundColorDark: '#7C7C7C',
    backgroundColorLight: '#E0E0E0',
    textColorDefault: '#000000',
    textColorReverse: '#FFFFFF',
    textColorDark: '#7C7C7C',
    textColorLight: '#E0E0E0',
    onPressClear: () => {},
    onPressDecide: (time: string) => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }
  
  clearClockTime = () => {
    this.setState({ ...initialState });
  }

  checkhour = (hour: string) => {
    const currentMinute = this.state.minute;
    this.setState({ hour });
    if (currentMinute === '') this.setState({ minute: '0' });
  };

  checkMinute = (minute: string) => {
    const currentHour = this.state.hour;
    this.setState({ minute });
    if (currentHour === '') {
      if (this.state.amMode) this.setState({ hour: '0' });
      else this.setState({ hour: '12' });
    }
  }

  renderButtonsBar = () => {
    const buttonsBase = {
      buttonContainerColor: this.props.backgroundColorDark,
      buttonTextColor: this.props.textColorReverse,
    };
    const buttons = [
      {
        ...buttonsBase,
        name: 'クリア',
        onPress: () => {
          this.clearClockTime();
          this.props.onPressClear();
        },
      },
      {
        ...buttonsBase,
        name: '決定',
        onPress: () => {
          this.props.onPressDecide(`${this.state.hour}:${this.state.minute}`);
        },
      },
    ];

    return <TodoButtonsBar buttons={buttons} />;
  };

  renderTimeDisplay = () => {
    var hour: string;
    var minute: string;

    if (this.state.hour === '') {
      hour = '--';
    } else {
      hour = `0${this.state.hour}`.slice(-2);
    }

    if (this.state.minute === '') {
      minute = '--';
    } else {
      minute = `0${this.state.minute}`.slice(-2);
    }

    return (
      <View style={[styles.displayContainer, { backgroundColor: this.props.backgroundColorDark }]}>
        <View style={{flex: 5}} />
        <View style={[styles.displayTextContainer, { flex: 3, backgroundColor: this.props.backgroundColorDark }]}>
          <Text style={[styles.displayText, { color: this.props.textColorReverse }]}>{hour}</Text>
        </View>
        <View style={[styles.displayTextContainer, { flex: 1, backgroundColor: this.props.backgroundColorDark }]}>
          <Text style={[styles.displayText, { color: this.props.textColorReverse }]}>:</Text>
        </View>
        <View style={[styles.displayTextContainer, { flex: 3, backgroundColor: this.props.backgroundColorDark }]}>
          <Text style={[styles.displayText, { color: this.props.textColorReverse }]}>{minute}</Text>
        </View>
        <View style={{flex: 5}} />
      </View>
    );
  }

  renderClockButtons = (mode: number) => {
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
      const value = i * rate + (mode === HOUR_MODE && !this.state.amMode ? 12 : 0);
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
              styles.touchBoard,
              {
                top: centerDistance + topDistance,
                left: centerDistance + leftDistance,
                backgroundColor: this.props.backgroundColorLight,
              },
              checked && { backgroundColor: this.props.backgroundColorDark },
            ]}
          >
            <Text style={{ color: checked ? this.props.textColorReverse : this.props.textColorDefault }}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  renderAmPm = () => (
    <View style={styles.innerBody}>
      <TouchableWithoutFeedback onPress={() => this.setState({ amMode: true })}>
        <View>
          <Text style={[
            styles.ampmText,
            { color: this.state.amMode ? this.props.textColorDark : this.props.textColorLight },
            this.state.amMode && styles.checkedAmpmText,
          ]}>
            AM
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => this.setState({ amMode: false })}>
        <View>
          <Text style={[
            styles.ampmText,
            { color: !this.state.amMode ? this.props.textColorDark : this.props.textColorLight },
            !this.state.amMode && styles.checkedAmpmText,
          ]}>
            PM
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

  renderClock = () => (
    <View style={styles.clockContainer}>
      <View style={styles.clockBody}>
        {this.renderAmPm()}
        {this.renderClockButtons(HOUR_MODE)}
        {this.renderClockButtons(MINUT_MODE)}
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderButtonsBar()}
        {this.renderTimeDisplay()}
        {this.renderClock()}
      </View>
    );
  }
}

export default TodoClock;
