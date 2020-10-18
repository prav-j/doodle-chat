import update from 'immutability-helper'
import {TYPES} from "./actions";

const INITIAL_STATE = {user: {}}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.signupUser:
      return update(state, {$set: {loading: true}})
    case TYPES.userSignedUp:
      return update(state, {$set: {token: action.payload}})
    case TYPES.userSignUpFailed:
      return update(state, {$set: {error: action.payload}})
    default:
      return state
  }
}