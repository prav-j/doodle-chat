export const TYPES = {
  sendMessage: 'chat/SEND_MESSAGE',
  messageReceived: 'chat/MESSAGE_RECEIVED',
  fetchMessageSuccess: 'chat/FETCH_MESSAGES_SUCCESS',
  fetchMessageError: 'chat/FETCH_MESSAGES_ERROR'
}

export const sendMessage = (message) => ({type: TYPES.sendMessage, payload: message})
export const messageReceived = (message) => ({type: TYPES.messageReceived, payload: message})

export const fetchMessageSuccess = (messages) => ({type: TYPES.fetchMessageSuccess, payload: messages})
export const fetchMessageError = (error) => ({type: TYPES.fetchMessageError, payload: error})