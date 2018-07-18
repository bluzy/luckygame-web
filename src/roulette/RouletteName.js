import React, { Component } from 'react';

class RouletteName extends Component {
    state = {
        name: ''
    }

    onChangeName = (e) => {
        const { data, onUpdate } = this.props;

        this.setState({
            name: e.target.value
        });

        onUpdate(data.id, {name:e.target.value});
    }

    remove = (e) => {
        const { onRemove, data } = this.props;

        onRemove(data.id);
    }

    render() {
        const { name } = this.state;

        const inputStyle = {
            fontSize: '16px'
        }

        return (
            <tr>
                <td>
                    <input placeholder="Name" type="text" style={inputStyle} value={name} onChange={this.onChangeName}/>
                </td>
                <td>
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.remove}>-</a>
                </td>
            </tr>
        )
    }
}

export default RouletteName;