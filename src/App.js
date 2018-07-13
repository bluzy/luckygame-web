import React, { Component } from 'react';
import './App.css';
import Ladder from './ladder/Ladder';

class App extends Component {
  render() {
    const names = ['name1', 'name2', 'name3', 'name4', 'name5']
    const goals = ['goal1', 'goal2', 'goal3', 'goal4', 'goal5']
    const branches = [[1,2,3,5],[4,6,9],[2,3,5,7],[1,6,9]]

    return (
      <div>
        <Ladder names={names} goals={goals} branches={branches}/>
      </div>
    );
  }
}

export default App;
