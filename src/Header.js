import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function Header(props) {
  return (
    <div className="flex-container justify-around"> 
      <div>
        Score: {props.score}
      </div>
      <div>
        {props.currChallenge}
      </div>
      <div>
        Toilet Level: {props.toiletLevel}
      </div>
    </div>
  );
}

export default Header;