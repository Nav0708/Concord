import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './Components/rooms.jsx';
import LoginForm from './Components/users.jsx';
import ChatRoom from './Components/chat-room.jsx';

const UserContext = createContext();

function App() {
  
  const [username, setUsername] = useState('');
  return (
    <Router>
      <div className="app-container">
      <UserContext.Provider value={{username}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:roomId" element={<Chat />} />
        </Routes>
      </UserContext.Provider>
      </div>
    </Router>
  );
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
      <ChatRoom/>
  </div>
);

export {UserContext}
export default App;
