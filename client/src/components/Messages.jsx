import React from "react";
import {useSelector} from "react-redux";

export default () => {
  const messages = useSelector(state => state.chat.messages)

  return <>{messages.map(message => <div>{message}</div>)}</>
}