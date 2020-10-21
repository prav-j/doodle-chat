import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Messaging from "./screens/Messaging";
import {useDispatch, useSelector} from "react-redux";
import Login from "./screens/Login";
import {userLoggedIn} from "./store/user/actions";
import {STORAGE_KEYS} from "./constants";
import {isMobile} from 'react-device-detect';
import {useMediaQuery} from "@material-ui/core";

const styles = {
  root: {
    backgroundColor: '#424242',
    height: '100vh'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    width: '100vw',
    overflow: 'hidden'
  },
}

const FullScreen = ({children}) => {
  return <Paper style={{...styles.root, ...styles.container, ...styles.fullScreen}}>
    {children}
  </Paper>
}
const Windowed = ({children}) => {
  return <Paper style={{...styles.root}}>
    <Container maxWidth="sm" style={styles.container}>
      {children}
    </Container>
  </Paper>
}

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)

  const fullScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const storedToken = window.localStorage.getItem(STORAGE_KEYS.token)
    if (storedToken) {
      const storedUser = window.localStorage.getItem(STORAGE_KEYS.username)
      dispatch(userLoggedIn(storedUser, storedToken))
    }
  }, [dispatch])

  const Wrapper = fullScreen || isMobile ? FullScreen : Windowed
  return <Wrapper>
    {!token && <Login/>}
    {token && <Messaging/>}
  </Wrapper>
}

export default hot(module)(App);
