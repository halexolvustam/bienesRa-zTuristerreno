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
import {
  MapPin,
  Download,
  FileText,
} from 'lucide-react';

export function Developments() {
  const { t } = useLanguage();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);

  return (
    <>
      <section id="developments" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.developments.title}
            </h2>
            <p className="text-gray-600">
              {t.developments.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {developments.map((dev) => (
              <Dialog key={dev.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-xl shadow cursor-pointer hover:shadow-xl transition">

                    <img
                      src={dev.image}
                      className="h-64 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-xl font-bold">{dev.name}</h3>
                      <p className="text-sm text-gray-500">{dev.location}</p>
                    </div>
                  </div>
                </DialogTrigger>

                {/* MODAL GRANDE */}
                <DialogContent className="w-screen h-screen max-w-none p-6 overflow-y-auto">

                  <DialogHeader>
                    <DialogTitle className="text-3xl">
                      {dev.name}
                    </DialogTitle>
                  </DialogHeader>

                  <p className="text-red-600 font-semibold mb-4">
                    Disponibilidad limitada
                  </p>

                  {/* HERO */}
                  <img
                    src={dev.image}
                    className="w-full h-80 object-cover rounded-lg mb-6"
                  />

                  <p className="text-gray-600 mb-6">
                    {dev.description}
                  </p>

                  {/* GALERÍA */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {dev.gallery?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="h-40 w-full object-cover rounded cursor-pointer hover:scale-105"
                        onClick={() => {
                          setCurrentGallery(dev.gallery || []);
                          setSelectedIndex(i);
                        }}
                      />
                    ))}
                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-col md:flex-row gap-4">

                    {/* WHATSAPP */}
                    <Button
                      className="flex-1 bg-green-600"
                      onClick={() => {
                        const budget = prompt("¿Cuál es tu rango de inversión?");
                        if (!budget) return;

                        const msg = encodeURIComponent(
                          `Hola, me interesa ${dev.name}. Mi presupuesto es ${budget}.`
                        );

                        window.open(`https://wa.me/5215566545971?text=${msg}`, "_blank");
                      }}
                    >
                      Solicitar información completa
                    </Button>

                    {/* BROCHURE */}
                    <Button className="flex-1 bg-amber-600" asChild>
                      <a href={dev.brochureUrl} target="_blank">
                        <Download className="w-4 h-4 mr-2" />
                        Brochure
                      </a>
                    </Button>

                    {/* LEGAL */}
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

      {/* LIGHTBOX CARRUSEL */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

          {/* IZQUIERDA */}
          <button
            className="absolute left-4 text-white text-5xl"
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? currentGallery.length - 1 : prev! - 1
              )
            }
          >
            ←
          </button>

          {/* IMAGEN */}
          <img
            src={currentGallery[selectedIndex]}
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />

          {/* DERECHA */}
          <button
            className="absolute right-4 text-white text-5xl"
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === currentGallery.length - 1 ? 0 : prev! + 1
              )
            }
          >
            →
          </button>

          {/* CERRAR */}
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

        </div>
      )}
    </>
  );
}