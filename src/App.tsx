import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Players from './pages/Players';
import Achievements from './pages/Achievements';
import SchoolFixtures from './pages/SchoolFixtures';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/fixtures" element={<SchoolFixtures />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;