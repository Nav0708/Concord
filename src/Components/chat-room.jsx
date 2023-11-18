import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [timestamp, setTimestamp] = useState(null);
  const [messageData, setMessageData] = useState([]);

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const response = await fetch(`/api/rooms/${roomId}`);
      if (response.ok) {
        const roomDetailsData = await response.json();
        setRoomDetails(roomDetailsData);
      } else {
        console.error('Failed to fetch room details');
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  const addMessage = async (roomId, messageData) => {
    const response = await fetch(`/api/rooms/${roomId}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
  };

  const getMessage = async (roomId) => {
    const response = await fetch(`/api/rooms/${roomId}/chats`);
    if (response.ok) {
      const messagesData = await response.json();
      setMessageData(messagesData);
    } else {
      console.error('Failed to fetch messages');
    }
  };

  console.log(messageData);

  const handleSendMessage = async () => {
    const response = await addMessage(roomId, {
      messageText: messageText,
    });
    var newTimestamp = await response.text();
    setTimestamp(newTimestamp);
    getMessage(roomId); // Fetch updated messages after sending a new message
  };

  return (
    <div>
      {roomDetails && (
        <div>
          <h2>Room: {roomId}</h2>
          <p>Description: {roomDetails.description}</p>
        </div>
      )}
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <ul>
        {messageData.map((message, id) => (
            <li key={id}>
            <strong>{/*username*/}:</strong> {JSON.stringify(message.messageText)} - {message.timestamp}
            </li>
        ))}
      </ul>

      <button onClick={handleSendMessage}>Send Message</button>
      {timestamp && <p>Message sent at: {timestamp}</p>}
    </div>
  );
};

export default ChatRoom;
