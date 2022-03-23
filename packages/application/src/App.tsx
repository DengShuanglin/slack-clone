import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { MarkdownInputEditor } from '@slack-pkg/components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MarkdownInputEditor />
    </div>
  )
}

export default App
