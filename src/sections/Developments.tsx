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
    <section id="developments" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.developments.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.developments.subtitle}
          </p>
        </div>

        {/* Developments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developments.map((dev) => (
            <Dialog key={dev.id}>
              <DialogTrigger asChild>
                <div
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 ${getStatusColor(
                        dev.status
                      )} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {getStatusText(dev.status)}
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {dev.name}
                      </h3>
                      <p className="text-white/80 text-sm">{dev.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {dev.description}
                    </p>

                    {/* Quick Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{dev.location}</span>
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dev.features.slice(0, 3).map((feature, idx) => {
                        const IconComponent = iconMap[feature.icon] || Check;
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs"
                          >
                            <IconComponent className="w-3 h-3" />
                            {feature.value}
                          </span>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                    >
                      {t.developments.viewMore}
                    </Button>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">
                    {dev.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/5215566545971?text=${encodeURIComponent(
                    `Hola, me interesa ${dev.name}. ¿Me puedes enviar información y disponibilidad?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center font-semibold"
                >
                  Solicitar información directa
                </a>

                <span className="text-red-600 font-semibold flex items-center">
                  Disponibilidad limitada
                </span>
              </div>

                <div className="mt-4">
                  {/* Hero Image */}
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Tagline */}
                  <p className="text-xl text-amber-600 font-medium mb-4">
                    {dev.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">{dev.description}</p>
                  <p style={{color: "red", fontWeight: "bold"}}>
                  </p>

                  <div className="mb-6">
                  <p className="text-lg font-semibold text-gray-900">
                    {dev.priceRange}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dev.location}
                  </p>
                </div>

                <p style={{ color: "red", fontWeight: "bold" }}>
                  {dev.gallery?.length}
                </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {dev.features.map((feature, idx) => {
                      const IconComponent = iconMap[feature.icon] || Check;
                      return (
                        <div
                          key={idx}
                          className="bg-stone-50 p-4 rounded-lg text-center"
                        >
                          <IconComponent className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                          <p className="text-xs text-gray-500">{feature.label}</p>
                          <p className="font-semibold text-gray-900">
                            {feature.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">
                      {t.developments.amenities}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {dev.amenities.map((amenity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {dev.gallery && dev.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={dev.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">

                  <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <a
                    href={`https://wa.me/5215566545971?text=${encodeURIComponent(
                      `Hola, me interesa ${dev.name} (web). ¿Me puedes enviar brochure, doc. legal y disponibilidad?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  </Button>

                  <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <a
                    href={`https://wa.me/5215566545971?text=${encodeURIComponent(
                      `Hola, me interesa ${dev.name}. ¿Me puedes enviar brochure, doc. legal y disponibilidad?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  </Button>

                    <Button
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                      asChild
                    >
                      <a
                        href={dev.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t.developments.downloadBrochure}
                      </a>
                    </Button>

                    {dev.legalDocs.length > 0 && (
                      <Button variant="outline" className="flex-1" asChild>
                        <a
                          href={dev.legalDocs[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {t.legal.title}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
