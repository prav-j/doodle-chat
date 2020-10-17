import React from 'react';
import ReactDOM from 'react-dom';
import Application from './App';
import {Provider} from "react-redux";
import createStore from './store'

const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

const store = createStore()

// render the app
const App = () => <Provider store={store}>
  <Application/>
</Provider>
ReactDOM.render(<App/>, root);
