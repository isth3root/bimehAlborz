import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ServicesPage } from './pages/ServicesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { HomePage } from './pages/HomePage';

function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={location.pathname} />
      <Outlet />
      <Footer />
    </div>
  );
}

function AppContent() {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (type: 'customer' | 'admin') => {
    setUserType(type);
    if (type === 'customer') {
      navigate('/customer-dashboard');
    } else {
      navigate('/admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="service-details/:id" element={<ServiceDetailsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard onLogout={handleLogout} />} />
      <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}