import update from 'immutability-helper'
import {TYPES} from "./actions";

const INITIAL_STATE = {user: {}}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.signupUser:
    case TYPES.loginUser:
      return update(state, {
        $set: {
          username: action.payload.username,
          loading: true
        }
      })
    case TYPES.userLoggedIn:
      return update(state, {
        loading: {$set: false},
        token: {$set: action.payload.token},
        username: {$set: action.payload.username},
        $unset: ['error']
      })
    case TYPES.userLoginFailed:
      return update(state, {
        loading: {$set: false},
        error: {$set: action.payload},
        $unset: ['token', 'username']
      })
    default:
      return state
  }
}