import { useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios  from "axios"
import Rooms from './Components/rooms.jsx'
import LoginForm from './Components/users.jsx'



function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('');
  const [name, setName]=useState('Navami')
 
  return (
    <>
      <LoginForm/>
    </>
  )
}

export default App

