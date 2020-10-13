import {ApolloProvider} from '@apollo/client'
import {useAuth0} from '@auth0/auth0-react'
import {makeStyles} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import {useSingleUploadMutation} from 'common'
import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Sidebar from './components/Sidebar'
import SlashScreen from './components/SplashScreen'
import About from './containers/About'
import Todos from './containers/Todos'
import getApolloClient from './utils/getApolloClient'

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: grey[200],
  },
})

export default function App() {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <AppProvider>
      <Router>
        <div className={classes.root}>
          <Header openDrawer={() => setIsDrawerOpen(true)} />
          <Sidebar
            isDrawerOpen={isDrawerOpen}
            closeDrawer={() => setIsDrawerOpen(false)}
          />
          <UploadFile />
          <Switch>
            <PrivateRoute exact path="/" component={Todos} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  )
}

const AppProvider: React.FC = props => {
  const {children} = props
  const {getAccessTokenSilently, isLoading, error} = useAuth0()

  const client = getApolloClient(getAccessTokenSilently)

  if (isLoading) {
    return <SlashScreen />
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const UploadFile = () => {
  const [singleUpload, {loading, error}] = useSingleUploadMutation()
  const onChange = async ({
    target: {
      validity,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      files: [file],
    },
  }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (validity.valid && file) {
        await singleUpload({variables: {file}})
      }
    } catch (error_) {
      console.log(`🇻🇳 [LOG]: UploadFile -> _`, error_)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>

  return (
    <>
      <input type="file" required onChange={onChange} />
    </>
  )
}
