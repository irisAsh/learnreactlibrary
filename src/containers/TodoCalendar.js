// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SEVEN_DAYS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  yearBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainYearText: {
    fontSize: 24,
  },
  subYearText: {
    fontSize: 16,
  },
  sevenDaysBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  sevenDayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthContainer: {
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 4,
  },
  monthText: {
    paddingLeft: 10,
    fontSize: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  onPressDate: (zeroFillDate: string) => void,
  monthSectionColor: string,
  monthTextColor: string,
  dateTextColor: string,
  checkedDateContainerColor: string,
  checkedDateTextColor: string,
  stackChecked: boolean,
  checkedDates: Array<string>,
};

type State = {
  currentYear: number,
  checkedDates: Array<string>,
};

class TodoCalendar extends Component<Props, State> {
  static defaultProps = {
    onPressDate: () => {},
    monthSectionColor: '#7C7C7C',
    monthTextColor: '#FFFFFF',
    dateTextColor: '#000000',
    checkedDateContainerColor: '#7C7C7C',
    checkedDateTextColor: '#FFFFFF',
    stackChecked: false,
    checkedDates: [],
  };

  constructor(props: Props) {
    super(props);
    const now = new Date();
    this.state = {
      currentYear: now.getFullYear(),
      checkedDates: this.props.checkedDates,
    };
  }

  // flow type
  scrollView: any;

  checkDate = (zeroFillDate: string) => {
    const prevCheckedDates = this.state.checkedDates;
    const checked = prevCheckedDates.indexOf(zeroFillDate) > -1;
    let checkedDates = [];
    if (this.props.stackChecked) {
      checkedDates = checked
        ? prevCheckedDates.filter(v => v !== zeroFillDate)
        : [...prevCheckedDates, zeroFillDate];
    } else {
      checkedDates = checked ? [] : [zeroFillDate];
    }
    this.setState({ checkedDates });
  };

  renderYearBar = (currentYear: number) => (
    <View style={styles.yearBarContainer}>
      {[-1, 0, 1].map(diff => (
        <View key={`yearBar${2 + diff}`} style={styles.yearContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
              this.setState({ currentYear: currentYear + diff });
            }}
          >
            <View>
              <Text style={diff === 0 ? styles.mainYearText : styles.subYearText}>
                {currentYear + diff}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  );

  renderSevenDaysBar = () => (
    <View style={styles.sevenDaysBarContainer}>
      {SEVEN_DAYS.map(day => (
        <View key={day} style={styles.sevenDayContainer}>
          <Text>{day}</Text>
        </View>
      ))}
    </View>
  );

  renderMonthCalendar = (year: number) => {
    const months = Array.from(new Array(12)).map((v, i) => i);
    const monthCalendar = months.map((month) => {
      const first = new Date(year, month, 1);
      const last = new Date(year, month + 1, 0);
      const firstDay = first.getDay();
      const dayNum = last.getDate();
      const pre = Array.from(new Array(firstDay)).map(() => '');
      const main = Array.from(new Array(dayNum)).map((v, i) => `${i + 1}`);
      const postNum = (firstDay + dayNum) % 7;
      const post = Array.from(new Array(postNum > 0 ? 7 - postNum : 0)).map(() => '');
      const days = [...pre, ...main, ...post];
      const dividedDays = days
        .map((v, i) => ((i + 1) % 7 === 0 ? days.slice(i - 6, i + 1) : null))
        .filter(v => !!v);
      const monthKey = `0000${year}`.slice(-4) + `0${month + 1}`.slice(-2);
      return (
        <View key={monthKey}>
          <View style={[styles.monthContainer, { backgroundColor: this.props.monthSectionColor }]}>
            <Text style={[styles.monthText, { color: this.props.monthTextColor }]}>
              {`${month + 1}月`}
            </Text>
          </View>
          {dividedDays.map((week, i) => {
            const weekKey = `${monthKey}week${i}`;
            return (
              <View key={weekKey} style={styles.weekContainer}>
                {week &&
                  week.map((date, j) => {
                    const dateKey = weekKey + `0${j}`.slice(-2);
                    const zeroFillDate = date === '' ? '' : monthKey + `0${date}`.slice(-2);
                    const checked = this.state.checkedDates.indexOf(zeroFillDate) > -1;
                    return (
                      <TouchableWithoutFeedback
                        key={dateKey}
                        onPress={() => {
                          if (zeroFillDate !== '') {
                            this.checkDate(zeroFillDate);
                            this.props.onPressDate(zeroFillDate);
                          }
                        }}
                      >
                        <View key={dateKey} style={styles.dateContainer}>
                          <View style={{ flex: 1 }}>
                            <View
                              style={[
                                styles.circle,
                                checked && {
                                  backgroundColor: this.props.checkedDateContainerColor,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.dateText,
                                  {
                                    color: checked
                                      ? this.props.checkedDateTextColor
                                      : this.props.dateTextColor,
                                  },
                                ]}
                              >
                                {date}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
              </View>
            );
          })}
        </View>
      );
    });
    return monthCalendar;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderYearBar(this.state.currentYear)}
        {this.renderSevenDaysBar()}
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          style={styles.scrollContainer}
        >
          {this.renderMonthCalendar(this.state.currentYear)}
        </ScrollView>
      </View>
    );
  }
}

export default TodoCalendar;
