import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../store/chat/actions";
import {connectSocket, disconnectSocket} from "../store/socket/actions";

export default () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(connectSocket())
    return () => {
      dispatch(disconnectSocket())
    }
  }, [])

  const onSendMessage = () => {
    sendMessage(message)
  }

  return <>
    <input type='text' value={message} onChange={event => setMessage(event.target.value)}/>
    <button type='button' onClick={onSendMessage}>Send Message</button>
  </>
}