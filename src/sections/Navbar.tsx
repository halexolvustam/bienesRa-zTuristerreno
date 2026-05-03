import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Menu, X, Globe } from 'lucide-react';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  const textColor = isScrolled ? 'text-gray-700' : 'text-white';
  const linkClass = `text-sm font-medium transition-colors hover:opacity-80 ${textColor}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

        <a href="#home">
          <img
            src="/logoTurisT.png"
            alt="Turisterreno"
            className={`h-16 w-auto transition-all ${isScrolled ? 'opacity-100' : 'brightness-0 invert'}`}
          />
        </a>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className={linkClass}>{t.nav.home}</a>
            <a href="#developments" className={linkClass}>{t.nav.developments}</a>
            <a href="#nosotros" className={linkClass}>{t.nav.about}</a>
            <a href="#contact" className={linkClass}>{t.nav.contact}</a>

            <button onClick={toggleLanguage} className={`flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80 ${textColor}`}>
              <Globe className="w-4 h-4" />
              <span>{language === 'es' ? 'English' : 'Espanol'}</span>
            </button>

            <a href="#contact" className="bg-green-900 hover:bg-green-800 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen
              ? <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              : <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            }
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              <a href="#home" className="text-gray-700 py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.home}</a>
              <a href="#developments" className="text-gray-700 py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.developments}</a>
              <a href="#nosotros" className="text-gray-700 py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
              <a href="#contact" className="text-gray-700 py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-gray-700 py-2 text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>{language === 'es' ? 'English' : 'Espanol'}</span>
              </button>
              <a href="#contact" className="bg-green-900 text-white text-center rounded-lg px-4 py-2 text-sm font-medium mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.contact}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
