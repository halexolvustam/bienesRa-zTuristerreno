import { useLanguage } from '@/hooks/useLanguage';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const activeDevelopmentLinks = [
    { href: '#developments', label: 'Hacienda Wayakin' },
    { href: '#developments', label: 'Las Villas Telchac' },
    { href: '#developments', label: 'Maní (Manikaab)' },
    { href: '#developments', label: 'Emana Tulum' },
    { href: '#developments', label: 'Aldea Holbox' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3">Turisterreno</h3>
            <p className="text-gray-400 text-sm mb-4">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/turisterrenoalpha" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/turisterreno/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@turisterreno" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors" aria-label="TikTok">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t.nav.home}</a></li>
              <li><a href="#developments" className="hover:text-white transition-colors">{t.nav.developments}</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.nav.developments}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {activeDevelopmentLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.nav.contact}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="tel:+525566545971" className="hover:text-white transition-colors">
                  55 66 545971
                </a>
              </li>
              <li>
                <a href="mailto:asesor.alexolvera@gmail.com" className="hover:text-white transition-colors break-all">
                  asesor.alexolvera@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Turisterreno. {t.footer.rights}
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}