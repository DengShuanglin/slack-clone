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
          <IndexRoute />
          <SignRegisterRoute />
          {/*<Route component={NotFound}/>*/}
          {/*<Redirect path='/'*/}

          {/*          to={localStorage.getItem(localStorageItemName.ACCESS_TOKEN) ? '/sign/signin' : '/index'}*/}
          {/*          exact={true}/>*/}
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
