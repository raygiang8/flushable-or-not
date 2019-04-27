import React, {Component} from 'react';
import io from 'socket.io-client';
import './App.css';
import ImageArea from './ImageArea';

class App extends Component {
  constructor(props) {
    super(props);

    const socket  = io.connect();
  }

  render() {
    return (
      <div>
        Hello
        <ImageArea />
      </div>
    );
  }
}

export default App;
