import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import AboutPage from './components/About';
import ServicesPage from './components/service';
import Contact from './components/contact';
import CaseStudyDetail from './pages/CaseStudyDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;