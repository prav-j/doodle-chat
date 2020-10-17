export const TYPES = {
  connectSocket: 'socket/SOCKET_CONNECT',
  disconnectSocket: 'socket/SOCKET_DISCONNECT',
  onSocketConnected: 'socket/SOCKET_CONNECTED',
  onSocketDisconnected: 'socket/SOCKET_DISCONNECTED',
}

export const connectSocket = () => ({type: TYPES.connectSocket});
export const disconnectSocket = () => ({type: TYPES.disconnectSocket});
export const onSocketConnected = () => ({type: TYPES.onSocketConnected});
export const onSocketDisconnected = () => ({type: TYPES.onSocketDisconnected});