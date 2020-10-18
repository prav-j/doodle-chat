import React from 'react';
import {hot} from 'react-hot-loader';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Messaging from "./screens/Messaging";
import Box from "@material-ui/core/Box";

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    height: '100vh'
  },
  paper: {
    backgroundColor: '#424242'
  },
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

  return <div style={styles.root}>
    <Container maxWidth="sm">
      <Paper style={styles.paper}>
        <Box style={styles.container}>
          {!token && <Login/>}
          {token && <Messaging/>}
        </Box>
      </Paper>
    </Container>
  </div>;
}

export default hot(module)(App);
