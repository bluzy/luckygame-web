import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import LadderApp from "./ladder/LadderApp"
import LadderView from './ladder/LadderView';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route exact path="/ladder" component={LadderApp}/>
        <Route path="/ladder/game" component={LadderView}/>
      </div>
    );
  }
}

export default App;
