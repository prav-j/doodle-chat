import React from "react";
import {useSelector} from "react-redux";
import Message from "./Message";

export default () => {
  const messages = useSelector(state => state.chat.messages)
  return <>{messages
    .map(message => <div key={message.sentAt}>
      <Message from={message.sentBy} message={message.content} sentAt={message.sentAt}/>
    </div>)}
  </>
}