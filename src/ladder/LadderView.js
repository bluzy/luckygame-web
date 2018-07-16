import React, { Component } from 'react';
import Ladder from './Ladder';
import queryString from 'query-string';

class LadderView extends Component {

  render() {
    let query = queryString.parse(this.props.location.search);
    console.log(query)

    let game = query.i;
    let g;
    if (game != null) {
        g = JSON.parse(Buffer.from(game, 'base64').toString('utf-8'));
    }

    if (g == null || g.users == null || g.goals == null || g.branches == null) {
        return (
        <div>
            Invalid data
        </div>
        )
    }

    return (
      <div>
        <Ladder names={g.users} goals={g.goals} branches={g.branches}/>
      </div>
    );
  }
}

export default LadderView;