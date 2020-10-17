import {combineReducers} from "redux";
import chatReducer from './chat/reducer'

export default combineReducers({
  chat: chatReducer
})