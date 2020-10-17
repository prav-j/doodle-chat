import {applyMiddleware, compose, createStore} from 'redux'
import reducers from './reducers';
import socketMiddleware from '../middlewares/socket'

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [socketMiddleware()]
  return createStore(reducers,
    composeEnhancers(
      applyMiddleware(...middlewares),
    )
  )
}