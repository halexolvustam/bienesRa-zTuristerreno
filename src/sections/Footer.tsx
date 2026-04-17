import { useLanguage } from '@/hooks/useLanguage';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/turisterrenoalpha', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/turisterreno/', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Turisterreno. Inversión Inteligente en Bienes Raíces.
            </h3>
            <p className="text-gray-400 text-sm">
              Desarrollos exclusivos que conectan con la esencia de la tierra,
              el mar y la historia de Yucatán y Quintana Roo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#developments"
                  className="hover:text-white transition-colors"
                >
                  {t.nav.developments}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Turisterreno. Inversión Inteligente en Bienes Raíces. {t.footer.rights}
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {t.footer.privacy}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
