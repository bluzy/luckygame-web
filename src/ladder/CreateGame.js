import React, { Component } from 'react';
import MemberPair from './MemberPair';

class CreateGame extends Component {
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
        let branches = []

        if (this.state.data.some(d => d.user === '' || d.goal === '')) {
            alert('Empty data');
            return;
        }

        this.state.data.forEach(d => {
            users.push(d['user'])
            goals.push(d['goal'])
        })

        let lastBranch

        for (let i=0; i<users.length-1; i++) {
            let b = []

            let prev = lastBranch != null ? 0 : -1

            for (let j=1; j<20; j++) {
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

        console.log(users)
        console.log(goals)
        console.log(branches)

        onUpdate(users, goals, branches)
    }

    render() {
        const list = this.state.data.map(data => (
            <MemberPair key={data.id} data={data} onUpdate={this.update} />
        ));
        return (
            <div>
                <div>
                    <input type='button' value='+' onClick={this.add}/>
                    <input type='button' value='-' onClick={this.remove} />
                </div>

                {list}                

                <input type='button' value='Submit' onClick={this.createGame} />
            </div>
        )
    }
}

export default CreateGame;