import {fetchMessageError, fetchMessageSuccess} from "./actions";
import {TYPES as userTypes} from "../user/actions";

const HOST = 'http://localhost:8080'

export const fetchMessages = (token, since) => {
  return fetch(`${HOST}/messages${since ? `since=${since}` : ''}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json().then(body => {
        if (response.status >= 400) {
          return fetchMessageError(body.error)
        }
        return fetchMessageSuccess(body)
      });
    })
}

export default store => next => action => {
  switch (action.type) {
    case userTypes.userLoggedIn:
      const latestMessage = store.getState().chat.messages[0]
      const since = latestMessage ? JSON.parse(latestMessage).sentAt : undefined
      fetchMessages(action.payload.token, since).then(action => store.dispatch(action))
      break
  }
  next(action)
}