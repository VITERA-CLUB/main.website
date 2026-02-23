import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feedback from './components/Feedback';
import Events from './components/EventTimeline';
import EntryPage from './components/EntryPage';
import PolaroidPage from './components/PolaroidPage';
import EventTicket from './components/EventTicket';
import Event from './components/Eventspage';
import TeamMembers from './components/teamMembers';
import ScrollToTopButton from './components/ScrollToTop';
import Winner from './components/winner';
import { useState, useEffect } from 'react';
import About from './components/About';

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
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/winner" element={<Winner />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:name" element={<Event />} />
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/polaroid" element={<PolaroidPage />} />
        <Route path="/event-pass" element={<EventTicket />} />
        <Route path="/alumni" element={<Alumni />} />
      </Routes>

     {/* Global scroll-to-top button */}
     <ScrollToTopButton />
    </>
  );
}

export default App;
