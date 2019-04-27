import React, { Component } from 'react';
import ImageArea from './ImageArea';
import io from 'socket.io-client';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: null,
      currentChallenge: null,
      score: 0,
      toiletOverflow: 0, // 0 = empty, 10 = full
    };

    // Connect socket
    const socket  = io.connect();
      
    /* Challenges:
      0 : Find the flushable
      1:  Find the unflushable
    */
    this.challenges = [0, 1];
  }

  newGame = () => {
    let challenge = Math.floor(Math.random() * this.challenges.length);
    this.setState({
      isPlaying: true,
      currentChallenge: challenge,
      score: 0,
      toiletOverflow: 0,
    });
  }

  roundOver = (status) => {
    if(status === "win") {
      let challenge = Math.floor(Math.random() * this.challenges.length);
      let newScore = this.state.score + 1;

      this.setState({
        score: newScore,
        isPlaying: true,
        currentChallenge: challenge,
      });
    }
    else {
      let newToiletOverflow = this.state.toiletOverflow + 1;

      if(this.state.toiletOverflow === 9) {
        this.setState({
          toiletOverflow: newToiletOverflow,
          isPlaying: false,
          currentChallenge: null,
        });
      }
      else {
        let challenge = Math.floor(Math.random() * this.challenges.length);  
        this.setState({
          toiletOverflow: newToiletOverflow,
          isPlaying: true,
          currentChallenge: challenge,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Flushable or Not</h1>
        <button id="start-game" onClick={this.newGame}>Start Game</button>
        <div>Score: { this.state.score }</div>
        <div>Toilet Level: { this.state.toiletOverflow }</div>
        <ImageArea
          isPlaying={this.state.isPlaying}
          currChallenge={this.state.currentChallenge}
          roundOver={this.roundOver}
        />
      </div>
    );
  }
}

export default Game;