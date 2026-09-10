import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './components/homepage';
import AboutPage from './components/About';
import ServicesPage from './components/service';

import Contact from './components/contact';
import LegalPage from './components/LegalPage';

import CaseStudyDetail from './pages/CaseStudyDetail';

import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={<Homepage />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* SERVICES */}
        <Route
          path="/services"
          element={<ServicesPage />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* CASE STUDIES */}
        <Route
          path="/case-studies/:slug"
          element={<CaseStudyDetail />}
        />

        {/* LEGAL PAGES */}
        <Route
          path="/privacy-policy"
          element={
            <LegalPage slug="privacy-policy" />
          }
        />

        <Route
          path="/terms-of-service"
          element={
            <LegalPage slug="terms-of-service" />
          }
        />

        <Route
          path="/cookie-policy"
          element={
            <LegalPage slug="cookie-policy" />
          }
        />
      </Routes>

      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;