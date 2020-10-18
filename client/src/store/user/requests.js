import {TYPES, userSignedUp, userSignUpFailed} from "./actions";

const HOST = 'http://localhost:8080'

export const signupUser = ({username, password}) => {
  return fetch(`${HOST}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
    .then(response => {
      return response.json().then(body => {
        if (response.status >= 400) {
          return userSignUpFailed(body.error)
        }
        return userSignedUp(body.token)
      });
    })
}

export default store => next => action => {
  switch (action.type) {
    case TYPES.signupUser:
      return signupUser(action.payload).then(action => store.dispatch(action))
    default:
      next(action)
  }
}