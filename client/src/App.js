import React from 'react';
import {hot} from 'react-hot-loader';
import Messaging from "./components/Messaging";

const App = () =>
  <div className="App">
    <Messaging/>
  </div>

export default hot(module)(App);
