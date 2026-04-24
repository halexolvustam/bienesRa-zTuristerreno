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
import { Download, FileText } from 'lucide-react';

export function Developments() {
  const { t } = useLanguage();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);

  return (
    <>
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              {t.developments.title}
            </h2>
            <p className="text-gray-600">
              {t.developments.subtitle}
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {developments.map((dev) => (
              <Dialog key={dev.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-lg shadow hover:shadow-xl cursor-pointer">
                    <img
                      src={dev.image}
                      className="h-60 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{dev.name}</h3>
                      <p className="text-sm text-gray-500">{dev.location}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {dev.description}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>

                {/* MODAL */}
                <DialogContent className="max-w-5xl w-full h-[90vh] overflow-y-auto p-6 rounded-xl">

                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {dev.name}
                    </DialogTitle>
                  </DialogHeader>

                  <p className="text-red-600 font-semibold mb-4">
                    Disponibilidad limitada
                  </p>

                  {/* HERO */}
                  <img
                    src={dev.image}
                    className="w-full h-72 object-cover rounded mb-6"
                  />

                  {/* INFO */}
                  <p className="mb-4 text-gray-600">{dev.description}</p>

                  <p className="text-lg font-semibold text-gray-900">
                    {dev.priceRange}
                  </p>

                  <p className="text-sm text-gray-500 mb-6">
                    {dev.location}
                  </p>

                  {/* FEATURES */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {dev.features?.map((f, i) => (
                      <div key={i} className="bg-stone-100 p-3 rounded text-center">
                        <p className="text-xs text-gray-500">{f.label}</p>
                        <p className="font-semibold">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* AMENITIES */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Amenidades</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {dev.amenities?.map((a, i) => (
                        <span key={i} className="text-sm text-gray-600">
                          • {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* GALERÍA */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {dev.gallery?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="h-32 w-full object-cover rounded cursor-pointer hover:scale-105"
                        onClick={() => {
                          setCurrentGallery(dev.gallery || []);
                          setSelectedIndex(i);
                        }}
                      />
                    ))}
                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-col md:flex-row gap-3">

                    <Button
                      className="flex-1 bg-green-600"
                      onClick={() => {
                        const budget = prompt("¿En qué rango estás considerando invertir?");
                        if (!budget) return;
                      
                        const msg = encodeURIComponent(
                          `Hola, me interesa ${dev.name}.
                          Estoy evaluando invertir y mi rango es: ${budget}.
                          
                          ¿Me puedes compartir:
                          - disponibilidad actual
                          - ubicación exacta
                          - esquema de pago?`
                          );
                      
                        // TRACKING
                        if (typeof window !== "undefined" && window.gtag) {
                          window.gtag("event", "click_whatsapp", {
                            event_category: "lead",
                            event_label: dev.name,
                          });
                        }
                      
                        window.open(`https://wa.me/5215566545971?text=${msg}`, "_blank");
                      }}
                    >
                      Solicitar información
                    </Button>

                    <Button className="flex-1 bg-amber-600" asChild>
                      <a href={dev.brochureUrl} target="_blank">
                        <Download className="w-4 h-4 mr-2" />
                        Brochure
                      </a>
                    </Button>

                    {dev.legalDocs?.length > 0 && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={dev.legalDocs[0].url} target="_blank">
                          <FileText className="w-4 h-4 mr-2" />
                          Legal
                        </a>
                      </Button>
                    )}

                  </div>

                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute left-4 text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === 0 ? currentGallery.length - 1 : prev! - 1
              );
            }}
          >
            ←
          </button>

          <img
            src={currentGallery[selectedIndex]}
            className="max-w-[90%] max-h-[90%] rounded"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === currentGallery.length - 1 ? 0 : prev! + 1
              );
            }}
          >
            →
          </button>

          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}