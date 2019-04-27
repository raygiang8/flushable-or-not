import React, { Component } from 'react';
import TimerBar from './TimerBar';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="header__timer">
          <h1 className="header__title">Flushable or Not</h1>
        </div>

        <div className="header__content">
          <div className="">
            <h3 className="header__heading">Score: {this.props.score} </h3>
          </div>
          <div className="">
            <h3 className="header__heading">Toilet Clog Level: {this.props.toiletLevel}</h3>
          </div>
        </div>
        <div className="header__timer">
          <h3 className="header__heading">Time to Choose: {this.props.timer} seconds</h3>
        </div>
        {/*<TimerBar time={this.props.timer} />*/}
      </div>
    );
  }
}

export default Header;