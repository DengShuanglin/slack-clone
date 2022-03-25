import './App.css'
import SignRegisterRoute from './router/SignRegisterRoute'
import IndexRoute from './router/IndexRoute'
import { HashRouter, Redirect, Route } from 'react-router-dom'
import NotFound from './views/NotFound/NotFound'
import UserContextProvider from './store'

function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <HashRouter>
          <SignRegisterRoute />
          <IndexRoute />
          {/*<Route component={NotFound}/>*/}
        </HashRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
