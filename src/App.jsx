import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import JobSeekers from './pages/JobSeekers'
import Clients from './pages/Clients'
import ProfessionalServices from './pages/ProfessionalServices'
import Admin from './pages/Admin'
import ChatWidget from './components/ChatWidget'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/job-seekers" element={<JobSeekers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/professional-services" element={<ProfessionalServices />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  )
}

export default App
