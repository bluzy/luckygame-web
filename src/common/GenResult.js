import React, { Component } from 'react';

class GenResult extends Component {

    copyToClipboard = () => {
        const area = this.refs.txt;

        area.select();
        document.execCommand('copy')
    }

    render() {
        const { url } = this.props;


        return (
            <div>
                <div>
                    <textarea ref='txt' class="materialize-textarea">{url}</textarea>
                </div>
                <div>
                    <a class="waves-effect waves-light btn" onClick={this.copyToClipboard}>Copy to clipboard</a>
                    <a class="waves-effect waves-light btn" href={url}>Go</a>
                </div>
            </div>
        )
    }
}

export default GenResult;