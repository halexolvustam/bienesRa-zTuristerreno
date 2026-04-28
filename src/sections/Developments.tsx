cat > src/sections/Developments.tsx << 'EOF'
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
import { Input } from '@/components/ui/input';
import { Download, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Developments() {
  const { t } = useLanguage();

  // Lightbox
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  // Modal de solicitud
  const [solicitudDialog, setSolicitudDialog] = useState<{ open: boolean; devName: string; devId: string } | null>(null);
  const [budget, setBudget] = useState('');

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
  };

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

  const sendWhatsApp = () => {
    if (!solicitudDialog) return;
    const msg = encodeURIComponent(
      `Hola, me interesa ${solicitudDialog.devName}.\n` +
      `Estoy evaluando invertir${budget ? ` y mi rango es: ${budget}` : ''}.\n\n` +
      `¿Me puedes compartir:\n- disponibilidad actual\n- ubicación exacta\n- esquema de pago?`
    );
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-10936994474/lead_whatsapp'
      });
      (window as any).gtag('event', 'click_whatsapp', {
        event_category: 'lead',
        event_label: solicitudDialog.devName,
      });
    }
    window.open(`https://wa.me/5215566545971?text=${msg}`, "_blank");
    setSolicitudDialog(null);
    setBudget('');
  };

  return (
    <>
      <section id="developments" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">{t.developments.title}</h2>
            <p className="text-gray-600">{t.developments.subtitle}</p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {developments.map((dev) => (
              <Dialog key={dev.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-lg shadow hover:shadow-xl cursor-pointer transition-shadow">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="h-60 w-full object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{dev.name}</h3>
                      <p className="text-sm text-gray-500">{dev.location}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{dev.description}</p>
                    </div>
                  </div>
                </DialogTrigger>

                {/* MODAL DETALLE */}
                <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{dev.name}</DialogTitle>
                  </DialogHeader>

                  <p className="text-red-600 font-semibold mb-4">Disponibilidad limitada</p>

                  <img src={dev.image} alt={dev.name} className="w-full h-72 object-cover rounded mb-6" />

                  <p className="mb-2 text-gray-600">{dev.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{dev.priceRange}</p>
                  <p className="text-sm text-gray-500 mb-6">{dev.location}</p>

                  {/* FEATURES */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {dev.features?.map((f, i) => (
                      <div key={i} className="bg-stone-100 p-3 rounded text-center">
                        <p className="text-xs text-gray-500">{f.label}</p>
                        <p className="font-semibold">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* AMENIDADES */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Amenidades</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {dev.amenities?.map((a, i) => (
                        <span key={i} className="text-sm text-gray-600">• {a}</span>
                      ))}
                    </div>
                  </div>

                  {/* GALERÍA — clic abre lightbox */}
                  {dev.gallery && dev.gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {dev.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${dev.name} ${i + 1}`}
                          className="h-32 w-full object-cover rounded cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
                          onClick={() => openLightbox(dev.gallery!, i)}
                        />
                      ))}
                    </div>
                  )}

                  {/* BOTONES */}
                  <div className="flex flex-col md:flex-row gap-3">

                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => setSolicitudDialog({ open: true, devName: dev.name, devId: dev.id })}
                    >
                      Solicitar información
                    </Button>

                    {dev.brochureUrl && (
                      <Button className="flex-1 bg-amber-600 hover:bg-amber-700" asChild>
                        <a href={dev.brochureUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Brochure
                        </a>
                      </Button>
                    )}

                    {dev.legalDocs?.length > 0 && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a href={dev.legalDocs[0].url} target="_blank" rel="noopener noreferrer">
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

      {/* MODAL SOLICITUD — fuera del Dialog del desarrollo */}
      {solicitudDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9998] px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Solicitar información</h3>
              <button onClick={() => { setSolicitudDialog(null); setBudget(''); }}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Te voy a conectar por WhatsApp sobre <strong>{solicitudDialog.devName}</strong>.
            </p>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              ¿En qué rango estás considerando invertir? <span className="text-gray-400">(opcional)</span>
            </label>
            <Input
              placeholder="Ej: $300,000 – $500,000 MXN"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={sendWhatsApp}>
              Abrir WhatsApp →
            </Button>
          </div>
        </div>
      )}

      {/* LIGHTBOX — completamente fuera de cualquier Dialog */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999]"
          onClick={closeLightbox}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition-colors"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={lightbox.images[lightbox.index]}
            alt={`imagen ${lightbox.index + 1}`}
            className="max-w-[88%] max-h-[88vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition-colors"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <button
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition-colors"
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
EOF