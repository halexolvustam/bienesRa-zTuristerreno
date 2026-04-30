import { useState } from "react";
import { useLanguage } from '@/hooks/useLanguage';
import { developments } from '@/data/developments';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Developments() {
  const { t, language } = useLanguage();
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const closeLightbox = () => setLightbox(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: lightbox.index === 0 ? lightbox.images.length - 1 : lightbox.index - 1,
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: lightbox.index === lightbox.images.length - 1 ? 0 : lightbox.index + 1,
    });
  };

  const isEn = language === 'en';

  return (
    <>
      <section id="developments" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">{t.developments.title}</h2>
            <p className="text-gray-600">{t.developments.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {developments.filter(dev => dev.status !== 'hidden').map((dev) => (
              <Dialog key={dev.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-lg shadow hover:shadow-xl cursor-pointer transition-shadow">
                    <img src={dev.image} alt={dev.name} className="h-60 w-full object-cover rounded-t-lg" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{dev.name}</h3>
                      <p className="text-sm text-gray-500">{isEn ? dev.locationEn : dev.location}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{isEn ? dev.descriptionEn : dev.description}</p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{dev.name}</DialogTitle>
                  </DialogHeader>

                  <p className="text-red-600 font-semibold mb-4">{t.developments.limitedAvailability}</p>
                  <img src={dev.image} alt={dev.name} className="w-full h-72 object-cover rounded mb-6" />

                  <p className="mb-2 text-gray-600 italic">{isEn ? dev.taglineEn : dev.tagline}</p>
                  <p className="mb-4 text-gray-600">{isEn ? dev.descriptionEn : dev.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{dev.priceRange}</p>
                  <p className="text-sm text-gray-500 mb-6">{isEn ? dev.locationEn : dev.location}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {dev.features?.map((f, i) => (
                      <div key={i} className="bg-stone-100 p-3 rounded text-center">
                        <p className="text-xs text-gray-500">{isEn ? f.labelEn : f.label}</p>
                        <p className="font-semibold">{isEn && f.valueEn ? f.valueEn : f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t.developments.amenities}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {(isEn ? dev.amenitiesEn : dev.amenities).map((a, i) => (
                        <span key={i} className="text-sm text-gray-600">• {a}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        const msg = encodeURIComponent(
                          `Hola, me interesa ${dev.name}.\n` +
                          `Me gustaria conocer disponibilidad, esquema de pago y detalles.`
                        );
                        if (typeof window !== "undefined" && (window as any).gtag) {
                          (window as any).gtag('event', 'click_whatsapp', { event_category: 'lead', event_label: dev.name });
                        }
                        window.open(`https://wa.me/5215566545971?text=${msg}`, "_blank");
                      }}
                    >
                      {t.developments.requestInfo}
                    </Button>

                    {dev.brochureUrl && (
                      <Button className="flex-1 bg-amber-600 hover:bg-amber-700" asChild>
                        <a href={dev.brochureUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          {t.developments.brochure}
                        </a>
                      </Button>
                    )}

                    {dev.legalDocs?.length > 0 && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={dev.legalDocs[0].url} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-2" />
                          {t.developments.legal}
                        </a>
                      </Button>
                    )}
                  </div>

                  {dev.gallery && dev.gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {dev.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${dev.name} ${i + 1}`}
                          className="h-32 w-full object-cover rounded cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightbox({ images: dev.gallery!, index: i });
                          }}
                        />
                      ))}
                    </div>
                  )}

                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999]"
          onClick={closeLightbox}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={lightbox.images[lightbox.index]}
            alt={`imagen ${lightbox.index + 1}`}
            className="max-w-[88%] max-h-[88vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <button
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-3"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </>
  );
}
