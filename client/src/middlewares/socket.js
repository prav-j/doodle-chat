import * as socketActions from '../store/socket/actions'
import * as chatActions from "../store/chat/actions";

const HOST = 'ws://localhost:8080/chat'
export default () => {
  let socket = null;

  const onOpen = store => (event) => {
    console.log('Websocket open:', event.target.url);
    store.dispatch(socketActions.onSocketConnected(event.target.url));
  };

  const onClose = store => () => {
    console.log('Disconnected from websocket');
    store.dispatch(socketActions.onSocketDisconnected());
  };

  const onMessage = store => (event) => {
    const receivedMessage = event.data;
    console.log('Received server message:', event);
    store.dispatch(chatActions.messageReceived(receivedMessage))
  };

  return store => next => action => {
    switch (action.type) {
      case socketActions.TYPES.connectSocket:
        if (socket !== null) {
          console.log('Already connected')
          break;
        }

        socket = new WebSocket(HOST);
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        break;
      case socketActions.TYPES.disconnectSocket:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('Disconnected')
        break;
      case chatActions.TYPES.sendMessage:
        socket.send(action.payload);
        break;
      default:
        return next(action);
    }
  };
};