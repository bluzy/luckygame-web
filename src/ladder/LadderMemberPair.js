import React, { Component } from 'react';

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
            <tr>
                <td>
                    <input placeholder="Name" type="text" value={user} onChange={this.onChangeUser}/>
                </td>
                <td class="input-field col s3">
                    <input placeholder="Goal" type="text" value={goal} onChange={this.onChangeGoal}/>
                </td>
                <td class="input-field col s1">
                    <a class="btn-floating btn-large waves-effect waves-light red" onClick={this.remove}>-</a>
                </td>
            </tr>
        )
    }
}

export default LadderMemberPair;