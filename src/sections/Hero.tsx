import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ChevronDown, FileText, ShieldCheck, MessageCircle } from 'lucide-react';

export function Hero() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero-yucatan.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>

        {/* BOTONES PRINCIPALES */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105" asChild>
            <a href="#developments">{t.hero.cta}</a>
          </Button>
          <Button size="lg" className="bg-green-700 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105" asChild>
            <a href="#contact">{isEn ? 'Get free quote' : 'Cotiza gratis'}</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 bg-transparent" asChild>
            <a href="#contact">{t.hero.ctaContact}</a>
          </Button>
        </div>

        {/* BARRA INFORMATIVA */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
          <span className="text-white/70 text-sm font-medium">{isEn ? 'Learn before you decide:' : 'Conoce antes de decidir:'}</span>
          <div className="flex items-center gap-4">
            <a href="#developments" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm font-medium">
              <FileText className="w-4 h-4" />
              Brochure
            </a>
            <span className="text-white/30">·</span>
            <a href="#developments" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              {isEn ? 'Legal Pack' : 'Pack Legal'}
            </a>
            <span className="text-white/30">·</span>
            <a href="https://wa.me/525566545971?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20antes%20de%20cotizar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-green-400 transition-colors text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              +Info
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#developments" className="text-white/80 hover:text-white">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}