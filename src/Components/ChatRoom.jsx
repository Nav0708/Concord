import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from '/src/App.jsx'


const ChatRoom = () => {
  const usercontext=useContext(UserContext);
  const [roomDetails, setRoomDetails] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [posterId, setPosterId] = useState('');
  const [timestamp, setTimestamp] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const [user, setUser]=useState(usercontext);
  const { roomId } = useParams();
  console.log(user);

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
      const data = await response.json();
      setMessageData(data);
      console.log('MessageData State :',messageData);
    } else {
      console.error('Failed to fetch messages');
    }
  };

  const handleSendMessage = async () => {
    const response = await addMessage(roomId, {messageText: messageText});
    console.log('Response object returned by handleSendMessage:',response);
    const newTimestamp = response;
    setTimestamp(newTimestamp);
    getMessage(roomId); 
    
  };

  const handleRefresh = () => {
      getMessage(roomId); 
    };

  return (
    <>
    <div>
      {roomDetails && (
        <div>
          <h2>Room: {roomId}</h2>
          <p>Description: {roomDetails.description}</p>
        </div>
      )}
      <ul>
        {messageData.map((message, id) => (
            <li key={id}>
            <strong>{message.posterId}:</strong> {message.messageText.messageText} -@ {message.timestamp}
            </li>
        ))}
      </ul>
    </div>
    <div>
      <input
        type="text"
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      {timestamp && <p>Message sent at: {timestamp}</p>}
      <button onClick={handleRefresh}>
        Refresh
      </button>
    </div>
    </>
  );
};

export default ChatRoom;
