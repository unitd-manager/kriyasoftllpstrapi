import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem('cookie-consent');
    if (!choice) setVisible(true);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('cookie-consent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100%-3rem)] sm:w-96 bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-white text-sm font-medium mb-2">We value your privacy</p>
      <p className="text-slate-400 text-xs leading-relaxed mb-4">
        We use cookies to improve your browsing experience and analyze site traffic. By clicking
        "Accept All", you consent to our use of cookies. See our{' '}
        <Link to="/cookie-policy" className="text-sky-400 hover:underline">
          Cookie Policy
        </Link>{' '}
        for details.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleChoice('accepted')}
          className="flex-1 text-sm font-medium bg-gradient-to-r from-sky-500 to-teal-400 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Accept All
        </button>
        <button
          onClick={() => handleChoice('rejected')}
          className="flex-1 text-sm font-medium border border-white/10 text-slate-300 px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}