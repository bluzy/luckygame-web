import React, { Component } from 'react';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

class GenResult extends Component {

    copyToClipboard = () => {
        const area = this.refs.txt;

        area.select();
        document.execCommand('copy');

        alert("Copied.");
    }

    render() {
        const { url } = this.props;


        return (
            <div>
                <div>
                    <textarea ref='txt' className="materialize-textarea">{url}</textarea>
                </div>
                <div>
                    <a className="waves-effect waves-light btn" onClick={this.copyToClipboard}>Copy to clipboard</a>
                    <a className="waves-effect waves-light btn" href={url}>Go</a>
                </div>
            </div>
        )
    }
}

export default GenResult;