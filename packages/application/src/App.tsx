import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {runTest} from "@slack-pkg/audio-utils";
import AudioRecord from "../../components/src/audio-record";
import Workspace from "./pages/workspace";
function App() {
  const [count, setCount] = useState(0)
  runTest();
  return (
    <div className="App">
      <Workspace/>
    </div>
  )
}

export default App
