import React, { Component } from 'react';
import TimerBar from './TimerBar';

class Header extends Component {
  constructor(props) {
    super(props);

    this.challenge = null;
  }

  render() {
    if(this.props.currChallenge === 0) {
      this.challenge = "Find the Flushable";
    }
    else if(this.props.currChallenge === 1) {
      this.challenge = "Find the Unflushable";
    }
    else if(this.props.currChallenge === 2) {
      this.challenge = "Find the Not Flushable";
    }
    else if(this.props.currChallenge === 3) {
      this.challenge = "Find the Not Unflushable";
    }
    else if(this.props.currChallenge === 4) {
      this.challenge = "Find the Flushable";
    }
    else if(this.props.currChallenge === 5) {
      this.challenge = "Find the Unflushable";
    }

    return (
      <div className="header">
        <div className="header__timer">
          <h1>Flushable or Not</h1>
        </div>

        <div className="header__content">
          <div className="">
            <h3 className="header__heading">Score: {this.props.score} </h3>
          </div>
          <div className="header__timer">
            <h3 className="header__heading">Time to Choose: {this.props.timer} seconds</h3>
          </div>
          <div className="">
            <h3 className="header__heading">Toilet Clog Level: {props.toiletLevel}</h3>
          </div>
        </div>
        {/*<TimerBar time={this.props.timer} />*/}
      </div>
    );
  }
}

export default Header;