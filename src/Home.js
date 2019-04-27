import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div class="body__wrapper flex">
      <div class="title__container">
        <div>
          <h1>FLUSHABLE or NOT?</h1>
          <Link
            to="/Game"
            className="primary-button"
          >
            PLAY!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;