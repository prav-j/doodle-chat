import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

// render the app
ReactDOM.render(<App />, root);
