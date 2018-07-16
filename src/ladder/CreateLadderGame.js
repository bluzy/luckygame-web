import React, { Component } from 'react';
import LadderMemberPair from './LadderMemberPair';

class CreateLadderGame extends Component {
    id = 2
    state = {
        data: [
            {id:0, user:'', goal:''},
            {id:1, user:'', goal:''}
        ]
    }

    add = () => {
        const { data } = this.state;
        this.setState({
            data: data.concat({ id: this.id++, ...data })
        }) 
    }

    update = (id, updated) => {
        const { data } = this.state;
        this.setState({
            data: data.map(
                d => id === d.id
                    ? { ...d, ...updated}
                    : d
            )
        })
    }

    remove = (id) => {
        if (this.state.data.length <= 2) {
            return
        }

        const { data } = this.state;
        this.setState({
            data: data.filter(d => d.id !== id)
        })
    }

    createGame = () => {
        const { onUpdate } = this.props

        let users = []
        let goals = []

        if (this.state.data.some(d => d.user === '' || d.goal === '')) {
            alert('Empty data');
            return;
        }

        this.state.data.forEach(d => {
            users.push(d['user'])
            goals.push(d['goal'])
        })

        let branches = this.createBranches(users);

        while (branches.some(b => b.length === 0)) {
            branches = this.createBranches(users);
        }

        let game = {
            users: users,
            goals: goals,
            branches: branches
        }

        onUpdate(game)
    }

    createBranches = (users) => {
        let branches = []
        let lastBranch

        let height = Math.max(users.length * 2, 20)

        for (let i=0; i<users.length-1; i++) {
            let b = []

            let prev = lastBranch != null ? 0 : -1

            for (let j=1; j<height; j++) {
                if (prev >= 0) {
                    while (prev < 9 && lastBranch[prev] < j) {
                        prev++;
                    }
                    if (lastBranch[prev] === j) {
                        continue;
                    }
                }
                let r = Math.floor(Math.random() * 2)
                if (r === 0) {
                    b.push(j);
                }
            }

            branches.push(b);
            lastBranch = b;
        }

        return branches
    }

    render() {
        const list = this.state.data.map(data => (
            <LadderMemberPair key={data.id} data={data} onUpdate={this.update} onRemove={this.remove} />
        ));
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Goal</th>
                            <td>
                                <a className="btn-floating btn-large waves-effect waves-light blue" onClick={this.add}>+</a>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>

                <a className="waves-effect waves-light btn-large col s6" onClick={this.createGame}>Submit</a>
            </div>
        )
    }
}

export default CreateLadderGame;