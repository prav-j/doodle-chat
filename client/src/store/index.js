import {applyMiddleware, compose, createStore} from 'redux'
import reducers from './reducers';
import socketMiddleware from '../middlewares/socket'

export default () => {
  const middlewares = [socketMiddleware()]
  return createStore(reducers,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}