import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import LadderApp from "./ladder/LadderApp"
import CreateLadderGame from './ladder/CreateLadderGame';
import Ladder from './ladder/Ladder';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route exact path="/ladder" component={LadderApp}/>
        <Route path="/ladder/create" component={CreateLadderGame}/>
        <Route path="/ladder/game" component={Ladder}/>
      </div>
    );
  }
}

export default App;
