import React, { Component } from 'react';
import CreateLadderGame from './CreateLadderGame';
import GenResult from '../common/GenResult';

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

    const wrapperStyle = {
      padding: '10px'
    }

    let link = key != null
        ? window.location.origin + "/ladder/game?i=" + key
        : null

    let genResult = link != null
        ? <GenResult url={link} />
        : ''

    return (
      <div style={wrapperStyle}>
        <CreateLadderGame onUpdate={this.updateGame}/>
        {genResult}
      </div>
    );
  }
}

export default LadderApp;
