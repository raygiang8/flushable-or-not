import React, { Component } from 'react';
import ImageArea from './ImageArea';
import io from 'socket.io-client';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: null,
      currentChallenge: null,
    };

    // Connect socket
    const socket  = io.connect();
      
    //   * Challenges:
    //   0 : Find the flushable
    //     1:  Find the unflushable
    // */
    this.challenges = [0, 1];
  
    // 0 = empty, 10 = full
    this.toiletOverflow = 0;
  }

  newGame = () => {
    let challenge = Math.floor(Math.random() * this.challenges.length);
    this.setState({
      isPlaying: true,
      currentChallenge: challenge,
    });
  }

  render() {
    return (
      <div>
        <h1>Flushable or Not</h1>
        <button id="start-game" onClick={this.newGame}>Start Game</button>
        <ImageArea isPlaying={this.state.isPlaying} currChallenge={this.state.currentChallenge} />
      </div>
    );
  }
}

export default Game;