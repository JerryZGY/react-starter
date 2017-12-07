// Node module
import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import 'semantic-ui-css/semantic.min.css';
// Containers
import App from './containers/app';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<App name='ReactStarter' status={true} />, MOUNT_NODE);

if (module.hot) { module.hot.accept(); }
