import { Component, useState } from 'react'
import './App.css'
import SignRegisterRoute from './router/SignRegisterRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SignRegisterRoute/>
    </div>
  )
}

export default App
