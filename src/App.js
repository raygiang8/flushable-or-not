import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Game from './Game';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Game" component={Game} />
      </div>
    </Router>
  );
}

export default App;
