import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function Header() {
  return (
    <div className="flex-container justify-around"> 
      <div>
        Score:
      </div>
      <div>
        Find the Flushable!
      </div>
      <div>
        Toilet Level:
      </div>
    </div>
  );
}

export default Header;