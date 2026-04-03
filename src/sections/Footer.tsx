import { Sparkles, Facebook, Instagram, MessageCircle, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Cotizar', href: '#cotizar' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

const services = [
  'Decoración Floral',
  'Iluminación LED',
  'Sonido Profesional',
  'Catering',
  'Fotografía',
  'Coordinación',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0612] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#inicio');
              }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-serif text-xl font-semibold text-white">
                Eventos<span className="text-amber-400">Pro</span>
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Transformamos tus sueños en realidad. Más de 10 años creando
              experiencias inolvidables para bodas, quinceañeras y eventos
              corporativos.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-violet-500/20 flex items-center justify-center text-white/60 hover:text-violet-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-violet-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-white/40 text-xs mb-1">Teléfono</p>
                <p className="text-white/80 text-sm">(55) 1234-5678</p>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">Email</p>
                <p className="text-white/80 text-sm">info@eventospro.com</p>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">Ubicación</p>
                <p className="text-white/80 text-sm">Ciudad de México</p>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">Horario</p>
                <p className="text-white/80 text-sm">Lun - Dom: 9am - 8pm</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © 2025 Eventos Pro. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
