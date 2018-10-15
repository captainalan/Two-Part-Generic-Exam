import React, { Component } from 'react';
import './App.css';
import Exam from './Exam.js'

class App extends Component {

  render() {
    return (
      <div className="App-header">
        <h1>Multiple Choice Test</h1>
        <Exam />
      </div>
    );
  }
}

export default App;