import React, { Component } from 'react';
import CreateLadderGame from './CreateLadderGame';
import GenResult from '../common/GenResult';
import AES from '../common/AES'

class LadderApp extends Component {
  state = {
    key: null
  }

  updateGame = (game) => {
    let gameInfo = AES.encrypt(JSON.stringify(game));

    this.setState({
      key: gameInfo
    })
  }

  render() {
    const { key } = this.state

    const wrapperStyle = {
      padding: '10px',
      minWidth: '100%',
      minHeight: '100%',
    }

    let link = key != null
      ? window.location.origin + "/ladder/game?i=" + key
      : null

    let genResult = link != null
      ? <div>
        <GenResult url={link} />
        <div className="divider"></div>
      </div>
      : ''

    return (
      <div style={wrapperStyle}>
        {genResult}
        <CreateLadderGame onUpdate={this.updateGame} />
      </div>
    );
  }
}

export default LadderApp;
