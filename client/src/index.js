import React from 'react';
import ReactDOM from 'react-dom';
import Application from './App';
import {Provider} from "react-redux";
import createStore from './store'
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const store = createStore()

const theme = {palette: { type: 'dark', primary: {main: '#2372e8'}}};

// render the app
const App = () => {
  return <Provider store={store}>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Application/>
    </ThemeProvider>
  </Provider>;
}
ReactDOM.render(<App/>, document.getElementById('root'));
