import React, { Component } from 'react';
import Roulette from './Roulette';
import queryString from 'query-string';
import AES from '../common/AES'

class RouletteView extends Component {

  render() {
    let query = queryString.parse(this.props.location.search);
    
    let game = query.i;
    let g;
    if (game != null) {
        g = JSON.parse(AES.decrypt(game));
    }

    if (g == null || g.names == null || g.names.length < 2) {
        return (
        <div>
            Invalid data
        </div>
        )
    }

    return (
      <div>
        <Roulette names={g.names}/>
      </div>
    );
  }
}

export default RouletteView;