import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Launcher from './Launcher';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Launcher />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
