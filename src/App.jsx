import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './Components/rooms.jsx';
import User from './Components/Users.jsx';
import ChatRoom from './Components/ChatRoom.jsx';

const UserContext = createContext();

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let cookieValue = null;
      const cookies = document.cookie.split(';');
      cookies.forEach((cookie) => {
        const cookieParts = cookie.trim().split('=');
        if (cookieParts[0] === 'publicUserId') {
          cookieValue = decodeURIComponent(cookieParts[1]);
        }
      });
      if (cookieValue) {
        const usersResponse = await fetch('/api/users');
        const users = await usersResponse.json();
        const user = users.find((user) => cookieValue === user.publicUserId);
        console.log(user);
        if (user) {
          if (typeof user.name === 'object') {
            setUsername(user.name.data);
            console.log('The value is an object.',username);
          } else if (typeof user.name === 'string') {
            setUsername(user.name);
            console.log('The value is a string.',username);
          } else {
            console.log('The value is neither an object nor a string.');
          }
        }
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={username}>
      <h3>Hi { username }</h3>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/rooms/:roomId" Component={Chat} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

const Home = () => (
  <div>
    <User />
    <RoomList />
    <button onClick={() => window.location.reload()}>
       View Chat rooms
    </button>
  </div>
);

const Chat = () => (
  <div>
    <User />
    <ChatRoom/>
  </div>
);

export { UserContext };
export default App;
