import React, { Component } from 'react';
import './App.css';
import Ladder from './ladder/Ladder';
import CreateGame from './ladder/CreateGame';

class App extends Component {
  state = {
    users:[],
    goals:[],
    branches:[]
  }

  updateGame = (users, goals, branches) => {
    this.setState({
      users:users,
      goals:goals,
      branches:branches
    })
  }

  render() {
    const { users, goals, branches } = this.state

    return (
      <div>
        <CreateGame onUpdate={this.updateGame}/>
        <Ladder names={users} goals={goals} branches={branches}/>
      </div>
    );
  }
}

export default App;
