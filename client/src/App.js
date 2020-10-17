import React from 'react';
import {hot} from 'react-hot-loader';
import Messages from "./components/Messages";

const App = () =>
  <div className="App">
    <h1>Hello, World.</h1>
    <Messages/>
  </div>

export default hot(module)(App);
