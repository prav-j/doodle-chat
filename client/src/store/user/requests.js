import {TYPES, userLoggedIn, userLoginFailed} from "./actions";

const HOST = 'http://localhost:8080'

const handleLoginResponse = response => {
  return response.json().then(body => {
    if (response.status >= 400) {
      return userLoginFailed(body.error)
    }
    return userLoggedIn(body.token)
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
      return signupUser(action.payload).then(action => store.dispatch(action))
    case TYPES.loginUser:
      return loginUser(action.payload).then(action => store.dispatch(action))
    default:
      next(action)
  }
}