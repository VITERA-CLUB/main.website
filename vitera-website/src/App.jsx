import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feedback from './components/Feedback';
import Event from './components/Eventspage';
import TeamMembers from './components/teamMembers';
import { useState, useEffect } from 'react';

function TeamPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add('sidebar-open');
    else document.body.classList.remove('sidebar-open');
    return () => document.body.classList.remove('sidebar-open');
  }, [isMenuOpen]);
  return(
    <TeamMembers />
  );
}

function App() {
  return (
    <>
      {/* Navbar is always on top */}
      <Navbar />

      {/* Routes below Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/event/:name" element={<Event />} />
      </Routes>
    </>
  );
}

export default App;
