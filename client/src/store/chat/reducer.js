import {TYPES} from "./actions";
import update from 'immutability-helper'

const INITIAL_STATE = {messages: []}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.messageReceived:
      return update(state, {messages: {$unshift: [action.payload]}})
    case TYPES.fetchMessageSuccess:
      const messages = state.messages
        .concat(action.payload)
        .sort((a, b) => b.sentAt - a.sentAt)
      return update(state, {messages: {$set: messages}})
    default:
      return state
  }
}