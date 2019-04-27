import React, { Component } from 'react';

class ImageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayList: null,
    };

    this.flushables = ['f1.png', 'f2.png'];
    this.unflushables = ['u1.png', 'u2.png', 'u3.png'];
    this.limit = 3;
    this.displayList = null;
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

    for(let i=0; i<this.limit; i++) {
      let unflushableIndex = Math.floor(Math.random() * this.unflushables.length);
      list.push(this.unflushables[unflushableIndex]);
    }

    this.displayList = this.shuffle(list).map((file, index) =>
      <div className="image-container">
        <img className="game-image" index={index} src={'./assets/' + file} alt="Picture of a Flushable or Unflushable Object" />
      </div>
    );
  };

  // Get a list of 1 Unflushable Object and 3 Flushable Objects
  getUnflushableList = () => {
    let list = [];
    let unflushableIndex = Math.floor(Math.random() * this.unflushables.length);
    list.push(this.unflushables[unflushableIndex]);

    for(let i=0; i<this.limit; i++) {
      let flushableIndex = Math.floor(Math.random() * this.flushables.length);
      list.push(this.flushables[flushableIndex]);
    }

    this.displayList = this.shuffle(list).map((file, index) =>
      <div className="image-container">
        <img className="game-image" index={index} src={'./assets/' + file} alt="Picture of a Flushable or Unflushable Object" />
      </div>
    );
  };

  render() {
    this.getFlushableList();
    return (
      <div id="image-area" className="flex-container">
        { this.displayList }
      </div>
    );
  }
}

export default ImageArea;