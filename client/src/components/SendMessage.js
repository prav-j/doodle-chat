import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import {sendMessage} from "../store/chat/actions";
import {connectSocket, disconnectSocket} from "../store/socket/actions";

const styles = {
  field: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '8px',
    marginRight: '8px',
    flexGrow: 1
  },
  button: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '8px',
    marginBottom: '8px'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
}

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
    dispatch(sendMessage(message))
    setMessage('')
  }

  return <>
    <div style={styles.container}>
      <div style={styles.field}>
        <TextField
          multiline={true}
          rowsMax={6}
          placeholder="Type a message"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
      </div>
      <div style={styles.button}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon/>}
          onClick={onSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  </>
}