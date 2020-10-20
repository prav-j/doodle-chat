import {applyMiddleware, compose, createStore} from 'redux'
import reducers from './reducers';
import socketMiddleware from '../middlewares/socket'
import userMiddleware from "./user/requests";
import chatMiddleware from "./chat/requests";

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducers,
    composeEnhancers(
      applyMiddleware(socketMiddleware(), userMiddleware, chatMiddleware),
    )
  )
}