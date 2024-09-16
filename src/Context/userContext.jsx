// MyContext.js
import React, { createContext, useState } from 'react';

const userContext = createContext();

const userProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  return (
    <MyContext.Provider value={{ myData, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

export { userProvider, userContext };
