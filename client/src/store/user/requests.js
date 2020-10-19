import {TYPES, userLoggedIn, userLoginFailed} from "./actions";
import {STORAGE_KEYS} from "../../constants";

const HOST = 'http://localhost:8080'

const handleLoginResponse = response => {
  return response.json().then(body => {
    if (response.status >= 400) {
      window.localStorage.removeItem(STORAGE_KEYS.username)
      window.localStorage.removeItem(STORAGE_KEYS.token)
      return userLoginFailed(body.error)
    }
    window.localStorage.setItem(STORAGE_KEYS.username, body.username)
    window.localStorage.setItem(STORAGE_KEYS.token, body.token)
    return userLoggedIn(body.username, body.token)
  });
};

export const signupUser = ({username, password}) => {
  return fetch(`${HOST}/users/sign-up`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
    .then(handleLoginResponse)
}

export const loginUser = ({username, password}) => {
  return fetch(`${HOST}/users/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
    .then(handleLoginResponse)
}

export default store => next => action => {
  switch (action.type) {
    case TYPES.signupUser:
      signupUser(action.payload).then(action => store.dispatch(action))
      break
    case TYPES.loginUser:
      loginUser(action.payload).then(action => store.dispatch(action))
      break
  }
  next(action)
}