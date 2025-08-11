import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      {/* Navbar is always on top */}
      <Navbar />

      {/* Routes below Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
