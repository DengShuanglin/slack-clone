import { Component, useState } from 'react'
import './App.css'
import SignRegisterRoute from './router/SignRegisterRoute'
import IndexRoute from './router/IndexRoute'
import {HashRouter, Redirect} from "react-router-dom";
import NotFound from "./views/NotFound/NotFound"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HashRouter>
          <SignRegisterRoute />
          <IndexRoute />
          {/* <Route component={NotFound} /> */}
      </HashRouter>
    </div>
  )
}

export default App
