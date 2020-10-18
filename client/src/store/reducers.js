import {combineReducers} from "redux";
import chatReducer from './chat/reducer'
import userReducer from './user/reducer'

export default combineReducers({
  chat: chatReducer,
  user: userReducer
})