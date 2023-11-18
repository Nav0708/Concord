import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  ChatRoom  from './chat-room.jsx';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [newRoomId,setNewRoomId]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rooms/');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRoomClick = (roomId) => {
    const clickedRoom = rooms.find((room) => room.id === roomId);
    setSelectedRoom(clickedRoom);

  };
  const handleAddRoom = async () => {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:newRoomId,
        name: newRoomName,
        description: newRoomDescription,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add a new room');
    }

    const updatedData = await fetch('api/rooms');
    if (!updatedData.ok) {
      throw new Error('Failed to fetch updated rooms');
    }

    setRooms(updatedData);
    setNewRoomName('');
    setNewRoomDescription('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Rooms</h2>
      <label>
        Room Name:
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Enter Room Name"
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={newRoomDescription}
          onChange={(e) => setNewRoomDescription(e.target.value)}
          placeholder="Enter Room Description"
        />
      </label>
      <button onClick={handleAddRoom}>Add Room</button>
      <ListRooms rooms={rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} handleRoomClick={handleRoomClick} />
    </div>
  );
};

const ListRooms = ({ rooms, selectedRoom, setSelectedRoom, handleRoomClick }) => {
  if (!rooms || rooms.length === 0) {
    return <div>Loading rooms...</div>;
  }
  return (
    <div className="listOfRooms">
      {Array.isArray(rooms) ? (
      <ul className="roomsList">
        { rooms.map((room) => (
          <li key={room.id} className="roomList">
              <Link to={`/rooms/${room.name}`} ><strong>{room.name}</strong>: {room.description}</Link>
          </li>
        ))}
        </ul>
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};

export default RoomList;
