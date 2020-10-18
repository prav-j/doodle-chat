import React from "react";
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";

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
export default ({from, message}) => {
  const theme = useTheme()
  return <div style={{...styles.container, ...(from === 'anonymous' ? styles.selfMessage : {})}}>
    <Paper style={styles.message(theme)}>
      <Typography variant="body2">{from}</Typography>
      <Typography variant="body1">{message}</Typography>
    </Paper>
  </div>
}