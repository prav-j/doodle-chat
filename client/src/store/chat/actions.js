export const TYPES = {
  sendMessage: 'chat/SEND_MESSAGE',
  messageReceived: 'chat/MESSAGE_RECEIVED'
}

export const sendMessage = (message) => ({type: TYPES.sendMessage, payload: message})
export const messageReceived = (message) => ({type: TYPES.messageReceived, payload: message})
