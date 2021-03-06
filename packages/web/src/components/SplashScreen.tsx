import {Box, createStyles, LinearProgress, makeStyles} from '@material-ui/core'
import React, {FC} from 'react'

import {Theme} from '../theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      padding: theme.spacing(3),
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000,
    },
  }),
)

const SlashScreen: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  )
}

export default SlashScreen
