import React from 'react';
import CountdownHTML from './countdown.js';

const Debug = false;

class Countdown extends React.Component {

  constructor(props) {
    super(props);
    this.startTime = new Date;
    this.state = {
      days: "--",
      hours: "--",
      minutes: "--",
      seconds: "--",
      after: false
    };
    if (Debug) console.log('|Countdown| initialize');
  }

  componentDidMount() {
    if (Debug) console.log('|Countdown| did mount');
    this.timerID = setInterval(
      () => this.update(),
      1000
    );
  }

  componentWillUnmount() {
    if (Debug) console.log('|Countdown| will unmount');
    clearInterval(this.timerID);
  }

  monthString(number) {
    switch (number) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'October';
      case 10: return 'November';
      case 11: return 'December';
      default: return 'Unknown';
    }
  }

  addZero(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  formatDate() {
    const test = false;
    const st = this.startTime;
    const date = this.props.data.date;
    const year = test ? st.getFullYear() : (date.year || "2018");
    const day = test ? st.getDate() : (date.day || "22");
    const month = test ? this.monthString(st.getMonth()) : (date.month || "November");
    const hour = test ? st.getHours() : (date.hour || "05");
    const minute = test ? this.addZero(st.getMinutes()) : "00";
    const seconds = test ? Math.min(59, st.getSeconds() + 10) : "00";
    return {
      date: `${day} ${month} ${year} ${hour}:${minute}:${seconds}`,
      format: "on"
    };
  }

  update() {
    const dateFormat = this.formatDate();
    const currentTime = Math.floor((new Date).getTime() / 1000);
    const eventDate = Date.parse(dateFormat.date) / 1000;

    if (eventDate <= currentTime) {
      this.setState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        after: true
      });
    } else {
      let seconds = eventDate - currentTime;
      let days = Math.floor(seconds / 86400);
      seconds -= days * 60 * 60 * 24;
      let hours = Math.floor(seconds / 3600);
      seconds -= hours * 60 * 60;
      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      seconds = this.addZero(seconds);
      minutes = this.addZero(minutes);
      hours = this.addZero(hours);
      days = this.addZero(days);
      this.setState({
        days,
        hours,
        minutes,
        seconds,
        after: false
      });
    }
  }

  render() {
    if (Debug) console.log('|Countdown| render');
    return (
      <CountdownHTML data={this.props.data} state={this.state} />
    );
  }
}

export default Countdown;
