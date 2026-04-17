import { useLanguage } from '@/hooks/useLanguage';
import { developments } from '@/data/developments';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Gallery() {
  const { t } = useLanguage();

  // Combine all images from developments (hero + galleries)
  const galleryImages = developments.flatMap((dev) => [
    { src: dev.image, title: dev.name, alt: dev.tagline, category: dev.name },
    ...dev.gallery.map((img) => ({
      src: img,
      title: dev.name,
      alt: dev.tagline,
      category: dev.name,
    })),
  ]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Gallery Grid - Masonry style */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-1">{image.alt}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-black">
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                    {image.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                  <p className="text-white/70">{image.alt}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
