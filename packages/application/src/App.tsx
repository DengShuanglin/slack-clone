import { Component, useState } from 'react'
import './App.css'
import SignRegisterRoute from './router/SignRegisterRoute'

class App extends Component {

  render() {
    return (
      <div>
        <SignRegisterRoute></SignRegisterRoute>
      </div>
    )
  }
}

export default App
