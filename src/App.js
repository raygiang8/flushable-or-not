import React, {Component} from 'react';
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const socket  = io.connect();
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default App;
