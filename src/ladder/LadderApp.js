import React, { Component } from 'react';
import CreateLadderGame from './CreateLadderGame';
import { NavLink } from 'react-router-dom';

class LadderApp extends Component {
    state = {
        key: null
    }
  updateGame = (game) => {
    let gameInfo = new Buffer(JSON.stringify(game)).toString('base64');
    console.log(gameInfo);

    this.setState({
      key: gameInfo
    })
  }

  render() {
    const { key } = this.state

    let link = key != null
        ? "/ladder/game?i=" + key
        : null

    let navLink = link != null
        ? <NavLink to={link}>{window.location.origin + link}</NavLink>
        : ''

    return (
      <div>
        <CreateLadderGame onUpdate={this.updateGame}/>
        {navLink}
      </div>
    );
  }
}

export default LadderApp;
