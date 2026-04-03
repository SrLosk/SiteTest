import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Flower2,
  Lightbulb,
  Armchair,
  UtensilsCrossed,
  Camera,
  Users,
} from 'lucide-react';

const services = [
  {
    icon: Flower2,
    title: 'Decoración Floral',
    description:
      'Arreglos florales naturales y artificiales que transforman cualquier espacio en un ambiente mágico y elegante.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Lightbulb,
    title: 'Iluminación y Sonido',
    description:
      'Equipos de iluminación LED y sonido profesional para crear la atmósfera perfecta en tu evento.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Armchair,
    title: 'Mobiliario y Sillas',
    description:
      'Amplia variedad de mobiliario, sillas, mesas y lounges para todo tipo de eventos y estilos.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering y Banquetes',
    description:
      'Servicio de catering completo con menús personalizados y atención de primera calidad.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Camera,
    title: 'Fotografía y Video',
    description:
      'Cobertura profesional de tu evento con fotógrafos y videógrafos experimentados.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Coordinación de Eventos',
    description:
      'Coordinadores profesionales que se encargan de cada detalle para que tú solo disfrutes.',
    color: 'from-fuchsia-500 to-pink-500',
  },
];

export function Services() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="servicios" className="py-24 bg-[#0f0a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Todo lo que necesitas para tu{' '}
            <span className="text-gradient">evento perfecto</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios para hacer de tu celebración
            un evento inolvidable y único.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors">
        {service.title}
      </h3>
      <p className="text-white/60 leading-relaxed">{service.description}</p>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
    </div>
  );
}
