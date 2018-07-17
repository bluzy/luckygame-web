import React, { Component } from 'react';
import Simplert from 'react-simplert';

class GenResult extends Component {
    
    state = {
        showAlert: false,
        alertType: '',
        alertTitle: '',
        alertMessage: ''
    }

    alert = (type, title, msg) => {
        this.setState({
            alertType: type,
            alertTitle: title,
            showAlert: true,
            alertMessage: msg
        })
    }

    onCloseAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = this.props.url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.alert('success', 'Copied to clipboard.', '');
    }

    render() {
        const { url } = this.props;

        const { showAlert, alertType, alertTitle, alertMessage } = this.state;

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

                <Simplert
                    showSimplert={showAlert}
                    type={alertType}
                    title={alertTitle}
                    message={alertMessage}
                    onClose={this.onCloseAlert}
                    />
            </div>
        )
    }
}

export default GenResult;