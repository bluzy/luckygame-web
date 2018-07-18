import React, { Component } from 'react';
import Simplert from 'react-simplert';

class Roulette extends Component {
    colors = ['Wheat', 'Coral', 'PowderBlue', 'DeepSkyBlue', 'ForestGreen', 'Khaki', 'LightBlue', 'LightGreen', 'LightPink', 'MistyRose', 'SandyBrown']
    state = {
        handAngle: Math.PI * 3 / 2,
        speed: 0.1
    }

    draw = () => {
        const canvas = this.refs.canvas;

        const bufferCanvas = this.refs.buffer;
        const buffer = bufferCanvas.getContext("2d")

        const ctx = canvas.getContext("2d");

        buffer.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

        this.drawPie(buffer, canvas.width);
        this.drawHand(buffer, canvas.width);

        ctx.drawImage(bufferCanvas, 0, 0);
    }

    drawPie = (ctx, radius) => {
        let { names } = this.props;

        ctx.lineWidth=1;
        ctx.strokeStyle='black';
        let angle = 2 * Math.PI / names.length;

        let center = radius / 2;

        let beginAngle = 0;
        let endAngle = 0;

        for (let i=0; i<names.length; i++) {
            beginAngle = endAngle;
            endAngle = Math.min(endAngle + angle, 2 * Math.PI);
            let color = this.colors[i % this.colors.length];

            ctx.beginPath();
            ctx.fillStyle = color;

            ctx.moveTo(center, center);
            ctx.arc(center, center, center - 20, beginAngle, endAngle);
            ctx.lineTo(center, center);
            ctx.stroke();

            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.font = "16px Arial";
            ctx.textAlign = "center";

            let textAngle = beginAngle + (angle / 2);
            let textDist = center * 2 / 3;
            ctx.fillText(names[i], center + textDist * Math.cos(textAngle), center + textDist * Math.sin(textAngle));
        }
    }

    drawHand(ctx, radius) {
        const { handAngle } = this.state;

        let center = radius / 2;
        let len = center * 0.7;
        let headLen = 30;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.7;

        let x = len * Math.cos(handAngle);
        let y = len * Math.sin(handAngle);

        let fromX = center - (x * 0.5);
        let fromY = center - (y * 0.5);

        let toX = center + x;
        let toY = center + y;

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);

        ctx.moveTo(toX, toY);
        ctx.lineTo(toX-headLen*Math.cos(handAngle-Math.PI/6), toY-headLen*Math.sin(handAngle-Math.PI/6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX-headLen*Math.cos(handAngle+Math.PI/6), toY-headLen*Math.sin(handAngle+Math.PI/6));
        ctx.stroke();

        ctx.globalAlpha = 1;
    }

    showResult = () => {
        const { handAngle } = this.state;
        let baseAngle = 2 * Math.PI / this.props.names.length;

        let idx = Math.floor(handAngle / baseAngle)

        this.setState({
            victim: this.props.names[idx]
        })

        this.forceUpdate();
    }

    init = () => {
        const canvas = this.refs.canvas;
        const buffer = this.refs.buffer;

        const ctx = canvas.getContext("2d");

        if (this.state.animId != null) {
            cancelAnimationFrame(this.state.animId);
        }

        ctx.strokeStyle="black"
        ctx.lineWidth=1

        let size = Math.min(window.innerWidth, window.innerHeight - 150);

        canvas.width = size;
        canvas.height = size;

        buffer.width = size;
        buffer.height = size;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle='AliceBlue'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        ctx.fillStyle='black'

        this.setState({
            skip: Math.floor(Math.random() * 500) + 50,
            speed: 0.2,
            victim: null
        });
    }

    componentDidMount() {
        this.init();
        this.draw();
    }

    start = () => {
        if (this.state.animId != null) {
            return;
        }

        this.init();
        this.anim();
    }

    anim = () => {
        const { handAngle, speed, skip, animId } = this.state;

        let nextSkip = skip;
        let nextSpeed = speed;

        if (nextSkip > 0) {
            nextSkip--;
        } else {
            nextSpeed = nextSpeed * 0.99;
        }

        let nextAngle = handAngle + speed;
        if (nextAngle > 2 * Math.PI) {
            nextAngle = nextAngle - 2 * Math.PI;
        }

        this.setState({
            handAngle: nextAngle,
            speed: nextSpeed,
            skip: nextSkip
        });

        this.draw();

        if (speed < 0.0005) {
            let pieAngle = 2 * Math.PI / this.props.names.length;
            if (Math.abs(pieAngle % handAngle) > 0.1) {
                cancelAnimationFrame(animId);
                console.log("Animation canceled, " + animId);
                this.setState({
                    skip: Math.floor(Math.random() * 500) + 50,
                    speed: 0.2,
                    animId: null
                });

                this.showResult();
            }
        } else {        
            let thisAnimId = requestAnimationFrame(this.anim);

            if (animId == null) {
                console.log("Animation started, " + thisAnimId)
                this.setState({
                    animId: thisAnimId
                });
            }
        }
    }

    render() {
        const frameStyle = {
            minWidth: '100%',
            display: 'flex',
            overflowX: 'auto'
        }
        const canvasStyle = {
            padding: '10px'
        };

        const none = {
            display: 'none'
        };

        const { victim } = this.state;

        let alert = victim != null
                ? (<Simplert
                        showSimplert='true'
                        type='info'
                        title={victim}
                        message='Congratulation!'
                    />)
                : null;

        return(
            <div>
                <canvas ref="buffer" width='100%' height='100%' style={none} />

                <section style={frameStyle}>
                    <canvas ref="canvas" width='100%' height='100%' style={canvasStyle} />
                </section>
                <div>
                    <a className="waves-effect waves-light btn-large" onClick={this.start}>Go</a>
                </div>
                {alert}
            </div>
        )
    }
}

export default Roulette;