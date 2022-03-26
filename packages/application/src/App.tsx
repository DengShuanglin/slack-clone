import './App.css'
import SignRegisterRoute from './router/SignRegisterRoute'
import IndexRoute from './router/IndexRoute'
import { BrowserRouter, HashRouter, Redirect, Route } from 'react-router-dom'
import NotFound from './views/NotFound/NotFound'
import UserContextProvider from './store'
import { localStorageItemName } from './utils/request'

function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <BrowserRouter>
          <Route
            path={'/notFound'}
            component={() => {
              return <NotFound />
            }}
          />
          <IndexRoute />
          <Route
            path={'/sign'}
            component={() => {
              return <SignRegisterRoute />
            }}
          />

          <Redirect from={'/'} to={'/index'} exact={true} />
          {/*<Route path={'*'} component={() => {*/}
          {/*    return <Redirect to={'/notFound'}/>*/}
          {/*}}>*/}
          {/*</Route>*/}
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
