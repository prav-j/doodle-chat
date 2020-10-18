import React from 'react';
import {hot} from 'react-hot-loader';
import Login from "./screens/Login";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {useTheme} from "@material-ui/core";

const styles = {
  root: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    height: '100vh'
  }),
}

const App = () => {
  const theme = useTheme()
  return <div style={styles.root(theme)}>
    <Container maxWidth="sm">
      <Paper>
        <Login/>
      </Paper>
    </Container>
  </div>;
}

export default hot(module)(App);
