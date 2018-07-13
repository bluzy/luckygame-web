import React, { Component } from 'react';

class Ladder extends Component {
    state = {
        xOffset: 20,
        yOffset: 20,
        ySpace: 50,
        xSpace: 100,
        branches: 10
    }

    drawNames = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.font = "16px Arial";
        ctx.textAlign = "center"

        let idx = 0;

        this.props.names.forEach(name => {
            ctx.fillText(name, this.getLineX(idx), this.state.yOffset, this.state.xSpace * 0.8);
            idx++;
        });
    }

    drawVLines = (cnt) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        for (var i=0; i<cnt; i++) {
            let x = this.getLineX(i);
            let y = this.getLineY(0);

            ctx.beginPath();
            ctx.moveTo(x, y);

            ctx.lineTo(x, this.getLineY(10));
            ctx.stroke();
        }
    }

    drawBranches = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        let idx = 0;

        this.props.branches.forEach(branch => {
            let x = this.getLineX(idx)

            branch.forEach(b => {
                let y = this.getLineY(b)
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+this.state.xSpace, y);
                ctx.stroke();
            })

            idx++
        });
    }

    drawGoals = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.font = "16px Arial";
        ctx.textAlign = "center"

        let idx = 0;

        this.props.goals.forEach(goal => {
            ctx.fillText(goal, this.getLineX(idx), this.getLineY(this.state.branches) + this.state.yOffset, this.state.xSpace * 0.8);
            idx++;
        });
    }

    startMove = (line) => {
        this.init();

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        let lines = this.getLines();

        if (line >= lines.length) {
            return
        }

        let paths = this.getPath(this.getLines(), line)

        console.log(paths)

        ctx.beginPath();
        ctx.moveTo(this.getLineX(line), this.getLineY(0))

        paths.forEach(p => {
            ctx.lineTo(p['x'], p['y']);
            ctx.strokeStyle="red"
            ctx.stroke()
        })
    }

    getLines = () => {
        let lines = [];

        let len = this.props.branches.length + 1;

        //init
        for (let i=0; i<len; i++) {
            let line = [];

            for (let j=0; j<10; j++) {
                line.push({left:false, right:false});
            }

            lines.push(line)
        }

        console.log(lines)

        let idx = 0;

        this.props.branches.forEach(branch => {
            let l = idx;
            let r = idx + 1;

            branch.forEach(b => {
                lines[l][b]['right'] = true;
                if (r < len) {
                    lines[r][b]['left'] = true;
                }
            })

            idx++;
        })

        return lines;
    }

    getPath = (lines, start) => {
        let x = start;

        let currLine = lines[x];

        let paths = [];

        for (let i=0; i<10; i++) {
            console.log('checking ' + x + ',' + i);
            let move = currLine[i]['left'] || currLine[i]['right'];

            if (move) {
                console.log('move on ' + x + ',' + i)
                paths.push({x: this.getLineX(x), y: this.getLineY(i)});

                if (currLine[i]['left']) {
                    x--;
                } else if (currLine[i]['right']) {
                    x++;
                }

                paths.push({x: this.getLineX(x), y: this.getLineY(i)});

                currLine = lines[x];
            }
        }

        paths.push({x: this.getLineX(x), y: this.getLineY(10)});

        return paths;
    }

    onClick = (e) => {
        const canvas = this.refs.canvas;

        let x = e.clientX - canvas.offsetTop;
        let y = e.clientY - canvas.offsetLeft;

        if (y > this.getLineY(0)) {
            return;
        }

        let i = (x / 100) | 0

        console.log(i)

        this.startMove(i)
    }

    getLineX = (x) => {
        return x * this.state.xSpace + this.state.xSpace / 2;
    }

    getLineY = (y) => {
        return y * this.state.ySpace + this.state.yOffset + 10;
    }

    init() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,canvas.width, canvas.height)

        ctx.strokeStyle="black"

        this.drawNames();
        this.drawGoals();
        this.drawVLines(this.props.names.length)
        this.drawBranches();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return(
            <div>
                <canvas ref="canvas" width={1024} height={768} onClick={this.onClick}/>
            </div>
        )
    }
}

export default Ladder;