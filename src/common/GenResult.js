import React, { Component } from 'react';

class GenResult extends Component {
    
    copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = this.props.url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        alert("Copied to clipboard.");
    }

    render() {
        const { url } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="input-field col s11">
                        <a href={url} target='_blank' rel="noopener noreferrer">
                        <textarea ref='txt' className="materialize-textarea" readOnly value={url}/>
                        </a>
                    </div>
                    <div className="input-field col s1">
                        <a className="btn-floating btn-large brown lighten-4" onClick={this.copyToClipboard}><i className="material-icons">filter_none</i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default GenResult;