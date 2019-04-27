import React, { Component } from 'react';

class TimerBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.time,
    }
  }

  componentDidMount = () => {
    if(this.state.time > 0) {
      setInterval(() => {
        this.setState({
          time: (this.state.time - 0.1).toFixed(1)
        })
      }, 100);
    }
    else {
      this.setState({
        time: this.props.time
      })
    }
  }

  render() {
    return (
      <div
        id="timer-bar"
        style={{
          background: '#fff3b0',
          width: Math.floor(this.state.time/5*100) + "%",
        }}
      >{ this.state.time }</div>
    );
  }
}

export default TimerBar;