import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['Todos', 'Bodas', 'Quinceañeras', 'Corporativos', 'Infantiles'];

const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Boda elegante con decoración floral',
    category: 'Bodas',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    alt: 'Decoración de evento corporativo',
    category: 'Corporativos',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    alt: 'Fiesta infantil temática',
    category: 'Infantiles',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
    alt: 'Quinceañera con decoración brillante',
    category: 'Quinceañeras',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    alt: 'Boda en jardín',
    category: 'Bodas',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    alt: 'Evento corporativo de gala',
    category: 'Corporativos',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80',
    alt: 'Fiesta infantil con globos',
    category: 'Infantiles',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    alt: 'Quinceañera elegante',
    category: 'Quinceañeras',
  },
];

export function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === 'Todos'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image: typeof galleryImages[0]) => {
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <section id="galeria" className="py-24 bg-[#0f0a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4">
            Galería de Eventos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Inspírate con nuestros <span className="text-gradient">trabajos</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Cada evento es único. Explora nuestra galería y descubre lo que podemos
            crear para ti.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-glow'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(image)}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-amber-400 font-medium">
                  {image.category}
                </span>
                <p className="text-white text-sm mt-1 line-clamp-2">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0f0a1a]/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <span className="text-amber-400 text-sm font-medium">
                {lightboxImage.category}
              </span>
              <p className="text-white text-lg mt-1">{lightboxImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
