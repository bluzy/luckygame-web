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

        onRemove(data.id);
    }

    render() {
        const { user, goal } = this.state;

        const inputStyle = {
            fontSize: '16px'
        }

        return (
            <tr>
                <td>
                    <input placeholder="Name" type="text" style={inputStyle} value={user} onChange={this.onChangeUser}/>
                </td>
                <td>
                    <input placeholder="Goal" type="text" style={inputStyle} value={goal} onChange={this.onChangeGoal}/>
                </td>
                <td>
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.remove}>-</a>
                </td>
            </tr>
        )
    }
}

export default LadderMemberPair;