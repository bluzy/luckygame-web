import React, { Component } from 'react';
import { Button } from 'reactstrap';

class LadderMemberPair extends Component {
    state = {
        user: '',
        goal: ''
    }

    onChangeUser = (e) => {
        const { data, onUpdate } = this.props;

        this.setState({
            user: e.target.value
        });

        onUpdate(data.id, {
            user: e.target.value,
            goal: this.state.goal
        });
    }

    onChangeGoal = (e) => {
        const { data, onUpdate } = this.props;

        this.setState({
            goal: e.target.value
        });

        onUpdate(data.id, {
            user: this.state.user,
            goal: e.target.value
        });
    }

    remove = (e) => {
        const { onRemove, data } = this.props;

        console.log("Removing " + data.id)

        onRemove(data.id);
    }

    render() {
        const user = this.state.user;
        const goal = this.state.goal;

        return (
            <div>
                <input placeholder="Name" value={user} onChange={this.onChangeUser}/>
                <input placeholder="Goal" value={goal} onChange={this.onChangeGoal}/>
                <Button onClick={this.remove}>-</Button>
            </div>
        )
    }
}

export default LadderMemberPair;