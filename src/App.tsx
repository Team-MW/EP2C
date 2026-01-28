import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MentionsLegales from './pages/MentionsLegales';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import ClientDocuments from './pages/dashboard/ClientDocuments';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Blog from './pages/Blog';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        {/* Dashboard Routes - Protected in   real app */}
        <Route path="/panel" element={<ClientDashboard />} />
        <Route path="/panel/documents" element={<ClientDocuments />} />

        {/* Admin Route - Clerk Protected */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
