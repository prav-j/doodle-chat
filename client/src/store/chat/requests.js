import {fetchMessageError, fetchMessageSuccess} from "./actions";
import {TYPES as userTypes} from "../user/actions";
import {REQUEST_HOST as HOST} from "../../config";

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
      const since = latestMessage ? latestMessage.sentAt : undefined
      fetchMessages(action.payload.token, since).then(action => store.dispatch(action))
      break
  }
  next(action)
}