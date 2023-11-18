import { useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './Components/rooms.jsx'
import LoginForm from './Components/users.jsx'
import ChatRoom from './Components/chat-room.jsx'
import React, { createContext } from "react";

const userContext = createContext();

function App() {
  const [username, setUsername] = useState('');
  
  return (
    <>  
    <Router>
      <div className="app-container">
        <Routes>
          <userContext.Provider value={{ username: '' }}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/:roomId" element={<Chat/>} />
          </userContext.Provider>
        </Routes>
      </div>
    </Router>
    </>
  )
}
const Home = () => (
  <div>
    <RoomList />
    <LoginForm />
  </div>
);
const Chat = () => (
  <div>
    <LoginForm />
    <ChatRoom />
  </div>
);

export default App

