import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import HospitalDashboard from './pages/HospitalDashboard';
import DonorDashboard from './pages/DonorDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        {(toggleSidebar) => (
          <Routes>
            <Route path="/" element={<Home toggleSidebar={toggleSidebar} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login toggleSidebar={toggleSidebar} />} />
            <Route path="/register" element={<Register toggleSidebar={toggleSidebar} />} />
            <Route path="/hospital-dashboard" element={<HospitalDashboard toggleSidebar={toggleSidebar} />} />
            <Route path="/donor-dashboard" element={<DonorDashboard toggleSidebar={toggleSidebar} />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
}

export default App;
