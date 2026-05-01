import { useLanguage } from '@/hooks/useLanguage';
import { Phone, Mail } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Alex Olvera</h3>
            <p className="text-amber-600 font-medium mb-6">{t.about.role}</p>
            <p className="text-gray-600 mb-4">{t.about.bio1}</p>
            <p className="text-gray-600 mb-8">{t.about.bio2}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+525566545971" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors">
                <Phone className="w-5 h-5" />
                <span>55 66 545971</span>
              </a>
              <a href="mailto:asesor.alexolvera@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors">
                <Mail className="w-5 h-5" />
                <span>asesor.alexolvera@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/alex-olvera.jpeg"
              alt="Alex Olvera - Turisterreno"
              className="w-72 h-72 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
