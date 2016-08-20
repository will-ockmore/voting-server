import React, { Component } from 'react';
import './App.css';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>BLAH</h1>
        <Voting pair={pair} hasVoted="Trainspotting" winner="Trainspotting"/>
      </div>
    );
  }
}

export default App;
