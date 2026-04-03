import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const contactInfo = [
  {
    icon: Phone,
    title: 'Teléfono',
    content: '(55) 1234-5678',
    subContent: 'Lunes a Domingo',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@eventospro.com',
    subContent: 'Respondemos en 24h',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    content: 'Ciudad de México',
    subContent: 'Cobertura nacional',
  },
  {
    icon: Clock,
    title: 'Horario',
    content: '9:00 AM - 8:00 PM',
    subContent: 'Todos los días',
  },
];

const eventTypes = [
  { id: 'boda', name: 'Boda' },
  { id: 'quince', name: 'Quinceañera' },
  { id: 'corporativo', name: 'Evento Corporativo' },
  { id: 'infantil', name: 'Fiesta Infantil' },
  { id: 'bautizo', name: 'Bautizo' },
  { id: 'graduacion', name: 'Graduación' },
  { id: 'otro', name: 'Otro' },
];

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      message: '',
    });
  };

  return (
    <section id="contacto" className="py-24 bg-[#0f0a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4">
            Contáctanos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Hablemos de tu <span className="text-gradient">evento</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Estamos listos para hacer de tu celebración un momento inolvidable.
            Contáctanos y comencemos a planear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-white/80">{info.content}</p>
                      <p className="text-white/50 text-sm">{info.subContent}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <Label className="text-white">Nombre completo</Label>
                  <Input
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white">Email</Label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white">Teléfono</Label>
                  <Input
                    type="tel"
                    placeholder="(55) 1234-5678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white">Tipo de evento</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, eventType: value })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1225] border-white/10">
                      {eventTypes.map((event) => (
                        <SelectItem
                          key={event.id}
                          value={event.id}
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Label className="text-white">Mensaje</Label>
                <textarea
                  placeholder="Cuéntanos sobre tu evento..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-glow hover:shadow-lg transition-all duration-300 py-6"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-[#1a1225] border-violet-500/30 text-white max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <DialogTitle className="font-serif text-2xl text-white">
              ¡Mensaje Enviado!
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Gracias por contactarnos. Hemos recibido tu mensaje y nos
              pondremos en contacto contigo lo antes posible.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowSuccessDialog(false)}
            className="w-full mt-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white"
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
