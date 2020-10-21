import React from "react";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'column'
  },
  messageArea: {
    display: 'flex',
    flexDirection: 'column-reverse',
    flexGrow: 1,
    overflowY: 'auto'
  },
  controlPanel: {
    display: 'flex',
    width: '100%',
    alignSelf: 'flex-end'
  }
}
export default () => {
  return <>
    <div style={styles.container}>
      <div style={styles.messageArea}>
        <Messages/>
      </div>
      <div style={styles.controlPanel}>
        <SendMessage/>
      </div>
    </div>
  </>
}