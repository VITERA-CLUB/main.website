import { Routes, Route } from 'react-router-dom'
import ViteraHomePage from './pages/ViteraHomePage'
import FeedbackPage from './components/Feedback'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ViteraHomePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  )
}

export default App
