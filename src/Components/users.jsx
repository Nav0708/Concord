import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '/src/App.jsx'

const LoginForm = () => {
  const user=useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [foundUser, setFoundUser] = useState(user);

  console.log('Lets see who is the user now',user);
  const sendDataToBackend = async (data) => {
      const response=await fetch('/api/account/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });
      console.log(response);
      if (response.ok)
      {
        setFoundUser(data);
        console.log('sent backend data',foundUser, typeof foundUser);
      }  
  };
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const updateName = () => {
    if (foundUser) {
      console.log(foundUser)
      sendDataToBackend(foundUser);
      setEditMode(false);
    }
  };
  return (
    <div>
      <h2>Hi {foundUser} Welcome to Chat App!</h2>
      <br />
      {editMode ? (
        <div>
          <input
            type="text"
            onChange={(e) => setFoundUser(e.target.value)}
            value={foundUser}
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
