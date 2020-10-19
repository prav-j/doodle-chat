import * as socketActions from '../store/socket/actions'
import * as chatActions from "../store/chat/actions";

const HOST = 'ws://localhost:8080/chat'
export default () => {
  let socket = null;
  const pendingMessages = []

  const onOpen = store => (event) => {
    console.log('Websocket open');
    while (pendingMessages.length) {
      socket.send(pendingMessages.shift())
    }
    store.dispatch(socketActions.onSocketConnected(event.target.url));
  };

  const onClose = store => () => {
    console.log('Disconnected from websocket');
    store.dispatch(socketActions.onSocketDisconnected());
  };

  const onMessage = store => (event) => {
    const receivedMessage = event.data;
    store.dispatch(chatActions.messageReceived(receivedMessage))
  };

  const prepareSocket = (store) => {
    if (socket !== null && socket.readyState <= 1) {
      return true
    }
    socket = new WebSocket(HOST);
    socket.onmessage = onMessage(store);
    socket.onclose = onClose(store);
    socket.onopen = onOpen(store);
    return false
  }

  return store => next => action => {
    switch (action.type) {
      case socketActions.TYPES.connectSocket:
        prepareSocket(store)
        break;
      case socketActions.TYPES.disconnectSocket:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case chatActions.TYPES.sendMessage:
        const isReady = prepareSocket(store)
        const message = JSON.stringify({
          type: 'NEW_MESSAGE',
          token: store.getState().user.token,
          data: action.payload
        });
        if (isReady) {
          socket.send(message)
        } else {
          pendingMessages.push(message)
        }
        break;
    }
    return next(action);
  };
};