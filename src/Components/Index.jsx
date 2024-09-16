import React, {} from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from '/src/App.jsx'


const Index = () => {
    return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/:roomId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
)
};

export default Index;
