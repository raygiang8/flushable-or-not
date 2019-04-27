import React from 'react';
function Header(props) {
  return (
    <div className="header">
      <div className="header__timer">
        <h1>Flushable or Not</h1>
      </div>

      <div className="header__content">
        <div className="">
          <h3 className="header__heading">Score: {props.score} </h3>
        </div>
        <div className="">
          <h3 className="header__heading">{props.currChallenge}</h3>
        </div>
        <div className="">
          <h3 className="header__heading">Toilet Level: {props.toiletLevel}</h3>
        </div>
      </div>
      <div className="header__timer">
        <h3 className="header__heading">{props.timer}</h3>
        {/* <div id="timerBar" style={{
          animationName: 'timer',
          animationDuration: `${props.timer}s`,
          animationIterationCount: 'infinite'
        }
        }></div> */}
      </div>

    </div>
  );
}

export default Header;