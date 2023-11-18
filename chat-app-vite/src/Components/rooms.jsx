import React, { useState, useEffect } from 'react';


const RoomList = () => {
 const [rooms, setRooms] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/rooms');
        console.log(response)

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.text();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
 }, []);

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 return (
    <div>
      <h2>Rooms</h2>
      <ul>
        
      </ul>
    </div>
 );
};

export default RoomList;