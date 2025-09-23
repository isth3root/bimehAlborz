import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ServicesSection } from './components/ServicesSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactUs } from './components/ContactUs';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { NotFound } from './components/NotFound';
import { Blogs } from './components/Blogs';
import { BlogDetail } from './components/BlogDetail';

type UserType = 'customer' | 'admin' | null;

function AppContent() {
  const [userType, setUserType] = useState<UserType>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  const handleLogin = (type: 'customer' | 'admin') => {
    setUserType(type);
    navigate(type === 'customer' ? '/customer-dashboard' : '/admin-dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  const currentPage = location.pathname.slice(1) || 'home';

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <HeroSlider onNavigate={handleNavigate} />
          <ServicesSection onNavigate={handleNavigate} />
          <BlogSection />
          <FAQSection />
          <Footer />
        </div>
      } />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />} />
      <Route path="/customer-dashboard" element={
        userType === 'customer' ? <CustomerDashboard onLogout={handleLogout} /> : <NotFound />
      } />
      <Route path="/admin-dashboard" element={
        userType === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <NotFound />
      } />
      <Route path="/contact" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <ContactUs />
          <Footer />
        </div>
      } />
      <Route path="/about" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <AboutUs />
          <Footer />
        </div>
      } />
      <Route path="/services" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <Services />
          <Footer />
        </div>
      } />
      <Route path="/blogs" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <Blogs />
          <Footer />
        </div>
      } />
      <Route path="/blogs/:id" element={
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <BlogDetail />
          <Footer />
        </div>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="bimehAlborz">
      <AppContent />
    </BrowserRouter>
  );
}