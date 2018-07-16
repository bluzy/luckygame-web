import React, { Component } from 'react';
import Ladder from './Ladder';
import CreateLadderGame from './CreateLadderGame';

class LadderApp extends Component {
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
        <CreateLadderGame onUpdate={this.updateGame}/>
        <Ladder names={users} goals={goals} branches={branches}/>
      </div>
    );
  }
}

export default LadderApp;
