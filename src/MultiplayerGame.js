import React, { Component } from 'react';
import ImageArea from './ImageArea';
import io from 'socket.io-client';
import './MultiplayerGame.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: null,
      currentChallenge: null,
      score: 0,
      toiletOverflow: 0, // 0 = empty, 10 = full
      timer: 5, // 5 seconds intitially, goes down by .1 every round
      gameFull: false,
      isPlayer: false,
    };

    // Connect socket
    this.socket  = io.connect();
      
    /* Challenges:
      0:  Find the flushable
      1:  Find the unflushable
      2:  Find the not flushable
      3:  Find the not unflushable
      4:  Find the flushable (there is none)
      5:  Find the unflushable (there is none)
    */
    this.challenges = [0, 1, 2, 3, 4, 5];
    this.enemyStats = {
      score: 0,
      toiletOverflow: 0,
    };
  }

  newGame = () => {
    let challenge = Math.floor(Math.random() * this.challenges.length);
    this.setState({
      isPlaying: true,
      currentChallenge: challenge,
      score: 0,
      toiletOverflow: 0,
    });
  };

  roundOver = (status) => {
    if(this.state.isPlaying) {
      if(status === "win") {
        let challenge = Math.floor(Math.random() * this.challenges.length);
        let newScore = this.state.score + 1;
        let newTimer = this.state.timer;
        
        if(this.state.timer >= 0.5) {
          newTimer -= 0.1;
        }
        
        this.setState({
          timer: newTimer.toFixed(1),
          score: newScore,
          isPlaying: true,
          currentChallenge: challenge,
        });

        this.socket.emit("scoreUpdate", this.state);
      }
      else {
        let newToiletOverflow = this.state.toiletOverflow + 1;

        if(this.state.toiletOverflow === 9) {
          this.socket.emit("endGame", newToiletOverflow);

          this.setState({
            toiletOverflow: newToiletOverflow,
            isPlaying: false,
            currentChallenge: null,
          });
        }
        else {
          let challenge = Math.floor(Math.random() * this.challenges.length);
          let newTimer = this.state.timer;
          if(this.state.timer >= 0.5) {
            newTimer -= 0.1;
          }  
          this.setState({
            timer: newTimer.toFixed(1),
            toiletOverflow: newToiletOverflow,
            isPlaying: true,
            currentChallenge: challenge,
          });
        }
        this.socket.emit("scoreUpdate", this.state);
      }
    }
  };

  componentDidMount = () => {
    /* SOCKETS */

    this.socket.on("gameFull", () => {
      this.setState({
        gameFull: true,
      });
    });

    this.socket.on("gameStart", () => {
      this.setState({
        isPlayer: true,
      });
      this.newGame();
    });

    this.socket.on("updateEnemy", (data) => {
      this.enemyStats = data;
    });

    this.socket.on("gameOver", () => {
      this.setState({
        isPlaying: false,
        currentChallenge: null,
      })
    });
  };

  render() {
    if(this.state.gameFull) {
      return(
        <div>
          Game is Full Try Again Later
        </div>
      );
    }
    else if(!this.state.isPlayer) {
      return(
        <div>
          Waiting for another Player
        </div>
      );
    }

    return (
      <div>
        <h1>Flushable or Not</h1>
        <div>Score: { this.state.score }</div>
        <div>Toilet Level: { this.state.toiletOverflow }</div>
        <div>Timer: { this.state.timer }</div>

        <div>Opponent Score: { this.enemyStats.score }</div>
        <div>Opponent Toilet Level: { this.enemyStats.toiletOverflow }</div>

        <div class="game-area">
          <ImageArea id="this-player"
            timer={this.state.timer}
            isPlaying={this.state.isPlaying}
            currChallenge={this.state.currentChallenge}
            roundOver={this.roundOver}
          />
        </div>
      </div>
    );
  }
}

export default Game;