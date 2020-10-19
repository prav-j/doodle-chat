import React from "react";
import {useSelector} from "react-redux";
import Message from "./Message";

export default () => {
  const messages = useSelector(state => state.chat.messages)
  return <>{messages
    .map(message => JSON.parse(message))
    .map(message => <Message from={message.sentBy} message={message.content}/>)}
  </>
}