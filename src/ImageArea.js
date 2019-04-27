import React, { Component } from 'react';

class ImageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayList: null,
    };

    this.challenge = null;
    this.flushables = ['f1.png', 'f2.png'];
    this.unflushables = ['u1.png', 'u2.png', 'u3.png'];
    this.limit = 4;

    this.roundList = null;
    this.displayList = null;
    this.roundInterval = null;
  }

  // Shuffle the order of the elements inside the array
  shuffle = (arr) => {
    for(let i=0; i<arr.length-1; i++) {
      let j = Math.floor(Math.random() * arr.length);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  // Get a list of 1 Flushable Object and 3 Unflushable Objects
  getFlushableList = () => {
    let list = [];
    let flushableIndex = Math.floor(Math.random() * this.flushables.length);
    list.push(this.flushables[flushableIndex]);

    for(let i=0; i<this.limit-1; i++) {
      let unflushableIndex = Math.floor(Math.random() * this.unflushables.length);
      list.push(this.unflushables[unflushableIndex]);
    }

    this.roundList = this.shuffle(list);

    this.displayList = this.roundList.map((file, index) =>
      <div className="image-container" key={index}>
        <img className="game-image" key={index} src={'./assets/' + file} alt="Flushable or Unflushable Object" />
      </div>
    );
  };

  // Get a list of 1 Unflushable Object and 3 Flushable Objects
  getUnflushableList = () => {
    let list = [];
    let unflushableIndex = Math.floor(Math.random() * this.unflushables.length);
    list.push(this.unflushables[unflushableIndex]);

    for(let i=0; i<this.limit-1; i++) {
      let flushableIndex = Math.floor(Math.random() * this.flushables.length);
      list.push(this.flushables[flushableIndex]);
    }

    this.roundList = this.shuffle(list);

    this.displayList = this.roundList.map((file, index) =>
      <div className="image-container" key={index}>
        <img className="game-image" key={index} src={'./assets/' + file} alt="Flushable or Unflushable Object" />
      </div>
    );
  };

  checkKeypress = (e) => {
    if(!this.props.isPlaying) {
      return;
    }
    let checkIndex;
    if(e.keyCode === 37) { checkIndex = 0 }
    else if(e.keyCode === 40) { checkIndex = 1 }
    else if(e.keyCode === 38) { checkIndex = 2 }
    else if(e.keyCode === 39) { checkIndex = 3 }

    if([37, 38, 39, 40].includes(e.keyCode)) {
      if(this.roundList[checkIndex].substring(0, 1) === this.target) {
        clearTimeout(this.roundInterval);
        this.props.roundOver("win");
      }
      else {
        clearTimeout(this.roundInterval);
        this.props.roundOver("lose");
      }
    }
  };

  render() {
    if(this.props.isPlaying) {
      document.addEventListener("keyup", this.checkKeypress);
    }

    if(this.props.currChallenge === 0) {
      this.getFlushableList();
      this.challenge = "Find the Flushable";
      this.target = 'f';
      this.roundInterval = setTimeout(() => { this.props.roundOver("lose"); }, 1000 * this.props.timer)
    }
    else if(this.props.currChallenge === 1) {
      this.getUnflushableList();
      this.challenge = "Find the Unflushable";
      this.target = 'u';
      this.roundInterval = setTimeout(() => { this.props.roundOver("lose"); }, 1000 * this.props.timer)
    }
    else if(this.props.currChallenge === 2) {
      this.getUnflushableList();
      this.challenge = "Find the Not Flushable";
      this.target = 'u';
    }
    else if(this.props.currChallenge === 3) {
      this.getFlushableList();
      this.challenge = "Find the Not Unflushable";
      this.target = 'f';
    }
    else if(this.props.currChallenge === 4) {
      this.getUnflushableList();
      this.challenge = "Find the Unflushable";
      this.target = 'u';
    }

    if(!this.props.isPlaying) {
      return(
        <div></div>
      );
    }

    return (
      <div>
        <h2 id="challenge-title">{ this.challenge }</h2>
        <div id="image-area" className="flex-container">
          { this.displayList }
        </div>
        <div className="flex-container">
          <div className="game-buttons">Left</div>
          <div className="game-buttons">Down</div>
          <div className="game-buttons">Up</div>
          <div className="game-buttons">Right</div>
        </div>
      </div>
    );
  }
}

export default ImageArea;