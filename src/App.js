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
        <Route path="" component={Home} />
        <Route path="/Game" component={Game} />
        <Route path="/MultiplayerGame" component={MultiplayerGame} />
      </div>
    </Router>
  );
}

export default App;
