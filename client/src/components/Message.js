import React from "react";
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import {useSelector} from "react-redux";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  message: (theme) => ({
    width: '60%',
    padding: '12px',
    margin: '8px',
    backgroundColor: theme.palette.primary.light
  }),
  selfMessage: {
    justifyContent: 'flex-end'
  }
}

const formatDate = (date) => {
  return `${date.getDate()}`.padStart(2, '0')
    + '/'
    + `${date.getMonth()}`.padStart(2, '0')
    + ' '
    + `${date.getHours()}`.padStart(2, '0')
    + ':'
    + `${date.getMinutes()}`.padStart(2, '0')
}

export default ({from, message, sentAt}) => {
  const theme = useTheme()
  const user = useSelector(state => state.user.username)
  const sentBySelf = from === user
  return <div style={{...styles.container, ...(sentBySelf ? styles.selfMessage : {})}}>
    <Paper style={styles.message(theme)}>
      <Typography variant="body2">{sentBySelf ? 'You' : from}</Typography>
      <Typography variant="body1">{message}</Typography>
      <Typography variant="body2" align="right">{formatDate(new Date(sentAt))}</Typography>
    </Paper>
  </div>
}