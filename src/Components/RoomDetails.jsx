import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const RoomDetails = ({ room }) => (
    <div>
      <p>Room name: {room.name}</p>
      <p>Description: {room.description}</p>
    </div>
);
return (
    <div>
      <label>
        Message Text:
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enter your message"
        />
      </label>
      <button onClick={handleSendMessage}>Send Message</button>
      {timestamp && <p>Message sent at: {timestamp}</p>}
    </div>
  );
export default RoomDetails;