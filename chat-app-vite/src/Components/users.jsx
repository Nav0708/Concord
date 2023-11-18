import React, { useState } from 'react';
import  { useEffect } from 'react';

const LoginForm = () => {
 const [username, setUsername] = useState('');

function getCookie(name) {
  let cookieValue = null;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
     const cookieParts = cookie.trim().split('=');
     if (cookieParts[0] === name) {
       cookieValue = decodeURIComponent(cookieParts[1]);
     }
  });
 
  return cookieValue;
 }
 
 const cookieValue = getCookie('publicUserId');
 console.log(cookieValue)


 useEffect(() => {
  const fetchData = async () => {
      const users=await fetch('/api/users');
      const names=await users.text();
      names.forEach(user => {
        if(cookieValue == user.publicUserId)
        {
           const userName = user.name;
           setUsername(userName);
        }
       }); 
  };
 fetchData();
}, []);

 const handleSubmit = (e) => {

 };
 return (
  <div>
  <h1>{username}</h1>
  <h2>Welcome to Chat App!</h2>
  <br />
  {editMode ? (
    <input
      type="text"
      onChange={handleUsernameChange}
      value={username}
    />
  ) : (
    <button type="submit" onClick={handleEditClick}>
      Change UserName
    </button>
  )}
</div>
 );
};
export default LoginForm;