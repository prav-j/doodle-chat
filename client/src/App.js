import React from 'react';
import {hot} from 'react-hot-loader';
import Login from "./screens/Login";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {useTheme} from "@material-ui/core";
import Messaging from "./screens/Messaging";
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";

const styles = {
  root: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    height: '100vh'
  }),
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '75vh'
  },
}

const App = () => {
  const theme = useTheme()
  const token = useSelector(state => state.user.token)

  return <div style={styles.root(theme)}>
    <Container maxWidth="sm">
      < Paper>
        <Box style={styles.container}>
          {!token && <Login/>}
          {token && <Messaging/>}
        </Box>
      </Paper>
    </Container>
  </div>;
}

export default hot(module)(App);
