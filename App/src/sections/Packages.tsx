import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    id: 'basico',
    name: 'Básico',
    price: 5000,
    description: 'Ideal para eventos íntimos y celebraciones pequeñas',
    icon: Sparkles,
    features: [
      'Decoración básica',
      '20 sillas con fundas',
      '2 mesas decoradas',
      'Iluminación básica',
      'Montaje y desmontaje',
      '1 coordinador',
    ],
    featured: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 12000,
    description: 'Nuestro paquete más popular para eventos medianos',
    icon: Star,
    features: [
      'Decoración completa temática',
      '50 sillas con fundas y moños',
      '5 mesas decoradas',
      'Iluminación LED ambiental',
      'Sonido profesional',
      'Coordinación incluida',
      'Candy bar decorado',
      'Floral básico',
    ],
    featured: true,
  },
  {
    id: 'lujo',
    name: 'Lujo',
    price: 25000,
    description: 'La experiencia completa para eventos extraordinarios',
    icon: Crown,
    features: [
      'Decoración premium personalizada',
      '100 sillas con fundas de lujo',
      '10 mesas con centro de mesa floral',
      'Iluminación inteligente RGB',
      'Sonido profesional + DJ',
      'Catering para 100 personas',
      'Fotografía profesional',
      'Video del evento',
      'Coordinador dedicado',
      'Mobiliario lounge',
    ],
    featured: false,
  },
];

export function Packages() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const scrollToQuote = (packageId: string) => {
    const element = document.querySelector('#cotizar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Store selected package in session storage for the quote form
      sessionStorage.setItem('selectedPackage', packageId);
    }
  };

  return (
    <section id="paquetes" className="py-24 bg-[#0f0a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4">
            Paquetes Especiales
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Elige el paquete <span className="text-gradient">perfecto</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tenemos opciones para todo tipo de eventos y presupuestos. Todos
            nuestros paquetes incluyen montaje y desmontaje.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              onSelect={() => scrollToQuote(pkg.id)}
            />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-white/40 text-sm mt-12">
          * Los precios pueden variar según la ubicación y requerimientos específicos.
          Contáctanos para una cotización personalizada.
        </p>
      </div>
    </section>
  );
}

interface PackageCardProps {
  pkg: (typeof packages)[0];
  index: number;
  onSelect: () => void;
}

function PackageCard({ pkg, index, onSelect }: PackageCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const Icon = pkg.icon;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-2xl transition-all duration-700 ${
        pkg.featured
          ? 'bg-gradient-to-b from-violet-600/20 to-violet-900/20 border-2 border-violet-500/50 scale-105 lg:scale-110 z-10'
          : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Featured Badge */}
      {pkg.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f0a1a] text-sm font-semibold">
            Más Popular
          </span>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              pkg.featured
                ? 'bg-gradient-to-br from-violet-500 to-violet-600'
                : 'bg-white/10'
            }`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              {pkg.name}
            </h3>
            <p className="text-white/50 text-sm">{pkg.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">
            ${pkg.price.toLocaleString()}
          </span>
          <span className="text-white/50 ml-2">MXN</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  pkg.featured
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <Check className="w-3 h-3" />
              </div>
              <span className="text-white/70 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          onClick={onSelect}
          className={`w-full py-6 transition-all duration-300 ${
            pkg.featured
              ? 'bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-glow'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
        >
          Seleccionar Paquete
        </Button>
      </div>

      {/* Glow Effect for Featured */}
      {pkg.featured && (
        <div className="absolute inset-0 rounded-2xl bg-violet-500/10 blur-xl -z-10" />
      )}
    </div>
  );
}
