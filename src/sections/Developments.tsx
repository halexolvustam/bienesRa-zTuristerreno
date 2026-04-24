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
  Maximize,
  Trees,
  Home,
  Shield,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Award,
  Globe,
  Tag,
  CreditCard,
  Building,
  Anchor,
  Percent,
  Wallet,
  Download,
  FileText,
  Check,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Maximize,
  Trees,
  Home,
  Shield,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Award,
  Globe,
  Tag,
  CreditCard,
  Building,
  Anchor,
  Percent,
  Wallet,
};

export function Developments() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'coming_soon':
        return 'bg-amber-500';
      case 'sold_out':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t.developments.status.available;
      case 'coming_soon':
        return t.developments.status.coming_soon;
      case 'sold_out':
        return t.developments.status.sold_out;
      default:
        return status;
    }
  };

  return (
    <>
      <section id="developments" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.developments.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.developments.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developments.map((dev) => (
              <Dialog key={dev.id}>
                <DialogTrigger asChild>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer">

                    <div className="relative h-64 overflow-hidden">
                      <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />

                      <div className={`absolute top-4 right-4 ${getStatusColor(dev.status)} text-white px-3 py-1 rounded-full text-sm`}>
                        {getStatusText(dev.status)}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">{dev.name}</h3>
                        <p className="text-white/80 text-sm">{dev.tagline}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{dev.description}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        {dev.location}
                      </div>

                      <Button className="w-full">{t.developments.viewMore}</Button>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">
                      {dev.name}
                    </DialogTitle>
                  </DialogHeader>

                  <span className="text-red-600 font-semibold">
                    Disponibilidad limitada
                  </span>

                  <img src={dev.image} className="w-full h-64 object-cover rounded-lg my-4" />

                  <p className="text-amber-600 font-medium">{dev.tagline}</p>
                  <p className="text-gray-600 mb-4">{dev.description}</p>

                  {/* GALERÍA */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {dev.gallery?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="h-32 w-full object-cover rounded cursor-pointer hover:scale-105"
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>

                  {/* BOTONES */}
                  <div className="flex flex-col sm:flex-row gap-3">

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

                    <Button asChild className="flex-1 bg-amber-600">
                      <a href={dev.brochureUrl} target="_blank">
                        Descargar brochure
                      </a>
                    </Button>

                  </div>

                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}