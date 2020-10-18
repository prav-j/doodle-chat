import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, signupUser} from "../store/user/actions";

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '75vh'
  },
  field: {
    width: '50%'
  },
  hidden: {
    opacity: 0
  },
  usernameField: {marginBottom: '4em'},
  passwordField: {marginBottom: '2em'},
  errorField: {marginBottom: '1em'},
  horizontalGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  }
}

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const error = useSelector(state => state.user.error)
  const dispatch = useDispatch()

  return <>
    <Box style={styles.container}>
      <TextField
        style={{...styles.field, ...styles.usernameField}}
        label="Username"
        variant="outlined"
        helperText="What should others call you?"
        value={username}
        onChange={(event) => setUsername(event.target.value)}/>
      <TextField
        style={{...styles.field, ...styles.passwordField}}
        label="Your password"
        variant="outlined"
        helperText="Enter your password, or pick one if you're new"
        value={password}
        onChange={(event) => setPassword(event.target.value)}/>
      <Alert style={{...styles.errorField, ...(error ? {} : styles.hidden)}} severity="error">
        {error}
      </Alert>
      <Box style={styles.horizontalGroup}>
        <Button variant="contained" onClick={() => dispatch(signupUser(username, password))}>Sign up</Button>
        <Button variant="contained" onClick={() => dispatch(loginUser(username, password))}>Login</Button>
      </Box>
    </Box>
  </>
}