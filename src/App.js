import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './Header';
import Game from './Game';
import MultiplayerGame from './MultiplayerGame';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={Home} />
        <Route path="/Game" component={Game} />
        <Route path="/MultiplayerGame" component={MultiplayerGame} />
      </div>
    </Router>
  );
}

export default App;
