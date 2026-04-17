import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-yucatan.jpg)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
        <Button
          size="lg"
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
          asChild
        >
          <a href="#developments">{t.hero.cta}</a>
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#developments" className="text-white/80 hover:text-white">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}
