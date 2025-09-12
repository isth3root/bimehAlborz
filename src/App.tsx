import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ServicesSection } from './components/ServicesSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ServicesPage } from './pages/ServicesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';

type Page = 'home' | 'login' | 'customer-dashboard' | 'admin-dashboard' | 'services' | 'about-us' | 'contact-us';
type UserType = 'customer' | 'admin' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userType, setUserType] = useState<UserType>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleLogin = (type: 'customer' | 'admin') => {
    setUserType(type);
    setCurrentPage(type === 'customer' ? 'customer-dashboard' : 'admin-dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'customer-dashboard' && userType === 'customer') {
    return <CustomerDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'admin-dashboard' && userType === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentPage === 'services') {
    return <ServicesPage />;
  }

  if (currentPage === 'about-us') {
    return <AboutUsPage />;
  }

  if (currentPage === 'contact-us') {
    return <ContactUsPage />;
  }

  // Homepage
  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <HeroSlider onNavigate={handleNavigate} />
      <ServicesSection />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
}