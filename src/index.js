import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from "./Root"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
registerServiceWorker();
