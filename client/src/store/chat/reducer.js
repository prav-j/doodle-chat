import {TYPES} from "./actions";
import update from 'immutability-helper'

const INITIAL_STATE = {messages: []}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.messageReceived:
      return update(state, {messages: {$unshift: [action.payload]}})
    default:
      return state
  }
}