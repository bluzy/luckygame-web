import React, { Component } from 'react';
import LadderMemberPair from './LadderMemberPair';
import { Button } from 'reactstrap';

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

    remove = () => {
        if (this.id === 2) {
            return
        }

        const { data } = this.state;
        this.setState({
            data: data.slice(0, data.length - 1)
        })
        this.id--;
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

        console.log(users)
        console.log(goals)
        console.log(branches)

        onUpdate(users, goals, branches)
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
            <LadderMemberPair key={data.id} data={data} onUpdate={this.update} />
        ));
        return (
            <div>
                <div>
                    <Button onClick={this.add}>+</Button>
                    <Button onClick={this.remove}>-</Button>
                </div>

                {list}                

                <Button onClick={this.createGame}>Submit</Button>
            </div>
        )
    }
}

export default CreateLadderGame;