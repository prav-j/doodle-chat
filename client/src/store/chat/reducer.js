import {TYPES} from "./actions";
import update from 'immutability-helper'

const INITIAL_STATE = {messages: []}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.sendMessage:
    case TYPES.messageReceived:
      return update(state, {messages: {$push: [action.payload]}})
    default:
      return INITIAL_STATE
  }
}