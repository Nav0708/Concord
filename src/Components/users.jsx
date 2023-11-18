import React, { useState, useEffect, useContext } from 'react';

const LoginForm = () => {

  const [editMode, setEditMode] = useState(false);
  const [foundUser, setFoundUser] = useState('');
  setFoundUser(context);

  const getCookie = (name) => {
    let cookieValue = null;
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const cookieParts = cookie.trim().split('=');
      if (cookieParts[0] === name) {
        cookieValue = decodeURIComponent(cookieParts[1]);
      }
    });
    return cookieValue;
  };

  const cookieValue = getCookie('publicUserId');

  useEffect(() => {
    const fetchData = async () => {
        if (cookieValue) {
          const usersResponse = await fetch('/api/users');
          const users = await usersResponse.json();
          const user = users.find((user) => cookieValue === user.publicUserId);
          if (user) {
            setFoundUser(user.publicUserId);
          }
        }
    };

    fetchData();
  }, [cookieValue]);

  const sendDataToBackend = async (data) => {
    try {
      await fetch('/api/account/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setFoundUser(data.username);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const updateName = () => {
    if (username.length > 0) {
      sendDataToBackend({ username });
      setEditMode(false);
    }
  };

  return (
    <div>
      <h1>Hi {foundUser}</h1>
      <h2>Welcome to Chat App!</h2>
      <br />
      {editMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
          />
          <button type="button" onClick={updateName}>
            Save
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleEditClick}>
          Edit UserName
        </button>
      )}
    </div>
  );
};

export default LoginForm;
