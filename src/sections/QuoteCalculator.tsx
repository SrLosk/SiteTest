import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useQuoteCalculator } from '@/hooks/useQuoteCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar, Users, MapPin, Calculator, Send, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function QuoteCalculator() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const {
    formData,
    eventTypes,
    addOns,
    calculateTotal,
    updateField,
    toggleAddon,
    resetForm,
  } = useQuoteCalculator();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Load selected package from session storage (browser-only and stable deps)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.sessionStorage) return;

    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
      // Pre-select some addons based on package
      const packageAddons: Record<string, string[]> = {
        basico: [],
        premium: ['iluminacion', 'sonido', 'coordinacion', 'candybar'],
        lujo: ['floral', 'iluminacion', 'sonido', 'dj', 'catering', 'fotografia', 'video', 'coordinacion'],
      };

      const addonsToSelect = packageAddons[selectedPackage] || [];
      addonsToSelect.forEach((addonId) => {
        if (!formData.selectedAddons.includes(addonId)) {
          toggleAddon(addonId);
        }
      });

      sessionStorage.removeItem('selectedPackage');
    }
  }, [formData.selectedAddons, toggleAddon]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="cotizar" className="py-24 bg-[#0f0a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-4">
            Cotizador en Línea
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Cotiza tu <span className="text-gradient">Evento</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Personaliza tu evento y obtén una cotización instantánea. 
            Selecciona los servicios que necesitas y te mostraremos el precio estimado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            >
              <div className="space-y-8">
                {/* Event Type */}
                <div className="space-y-3">
                  <Label className="text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-violet-400" />
                    Tipo de Evento
                  </Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => updateField('eventType', value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Selecciona el tipo de evento" />
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

                {/* Guest Count */}
                <div className="space-y-3">
                  <Label className="text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-violet-400" />
                    Cantidad de Invitados:{' '}
                    <span className="text-amber-400 font-semibold">
                      {formData.guestCount}
                    </span>
                  </Label>
                  <Slider
                    value={[formData.guestCount]}
                    onValueChange={(value) => updateField('guestCount', value[0])}
                    min={10}
                    max={300}
                    step={10}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>10</span>
                    <span>150</span>
                    <span>300</span>
                  </div>
                </div>

                {/* Date and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      Fecha del Evento
                    </Label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => updateField('eventDate', e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      Ubicación
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => updateField('location', value)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                        <SelectValue placeholder="Selecciona ubicación" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1225] border-white/10">
                        <SelectItem
                          value="salon"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Salón de Eventos
                        </SelectItem>
                        <SelectItem
                          value="jardin"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Jardín (+15%)
                        </SelectItem>
                        <SelectItem
                          value="playa"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Playa (+30%)
                        </SelectItem>
                        <SelectItem
                          value="terraza"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Terraza (+10%)
                        </SelectItem>
                        <SelectItem
                          value="hacienda"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Hacienda (+20%)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                  <Label className="text-white flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-violet-400" />
                    Servicios Adicionales
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addOns.map((addon) => (
                      <div
                        key={addon.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          formData.selectedAddons.includes(addon.id)
                            ? 'bg-violet-500/10 border-violet-500/30'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <Checkbox
                          checked={formData.selectedAddons.includes(addon.id)}
                          onCheckedChange={() => toggleAddon(addon.id)}
                          className="mt-0.5 border-white/30 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-medium">
                              {addon.name}
                            </span>
                            <span className="text-amber-400 text-sm font-semibold">
                              {addon.pricePerPerson
                                ? `$${addon.price}/persona`
                                : `$${addon.price.toLocaleString()}`}
                            </span>
                          </div>
                          <p className="text-white/50 text-xs mt-1">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-3">
                    <Label className="text-white">Nombre</Label>
                    <Input
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white">Teléfono</Label>
                    <Input
                      type="tel"
                      placeholder="(55) 1234-5678"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-3 sm:col-span-2">
                    <Label className="text-white">Mensaje Adicional</Label>
                    <textarea
                      placeholder="Cuéntanos más detalles sobre tu evento..."
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-glow hover:shadow-lg transition-all duration-300 py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Solicitar Cotización
                </Button>
              </div>
            </form>
          </div>

          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl bg-gradient-to-b from-violet-600/20 to-violet-900/20 border border-violet-500/30">
              <h3 className="font-serif text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-violet-400" />
                Resumen de Cotización
              </h3>

              <div className="space-y-4 mb-6">
                {/* Event Type */}
                {formData.eventType && (
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">
                      {eventTypes.find((e) => e.id === formData.eventType)?.name}
                    </span>
                    <span className="text-white text-sm">
                      {formatCurrency(
                        eventTypes.find((e) => e.id === formData.eventType)?.basePrice || 0
                      )}
                    </span>
                  </div>
                )}

                {/* Add-ons */}
                {formData.selectedAddons.map((addonId) => {
                  const addon = addOns.find((a) => a.id === addonId);
                  if (!addon) return null;
                  return (
                    <div
                      key={addonId}
                      className="flex justify-between items-center py-2 border-b border-white/10"
                    >
                      <span className="text-white/60 text-sm">{addon.name}</span>
                      <span className="text-white text-sm">
                        {addon.pricePerPerson
                          ? `${formatCurrency(addon.price * formData.guestCount)} (${formData.guestCount} pax)`
                          : formatCurrency(addon.price)}
                      </span>
                    </div>
                  );
                })}

                {/* Location Multiplier */}
                {formData.location !== 'salon' && (
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/60 text-sm">
                      Ubicación ({formData.location})
                    </span>
                    <span className="text-amber-400 text-sm">
                      +
                      {
                        {
                          salon: '0%',
                          jardin: '15%',
                          playa: '30%',
                          terraza: '10%',
                          hacienda: '20%',
                        }[formData.location]
                      }
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-violet-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Total Estimado:</span>
                </div>
                <div className="text-4xl font-bold text-gradient">
                  {formatCurrency(calculateTotal)}
                </div>
                <p className="text-white/40 text-xs mt-2">
                  * Precio estimado. La cotización final puede variar según
                  requerimientos específicos.
                </p>
              </div>
            </div>
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
              ¡Cotización Enviada!
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Hemos recibido tu solicitud de cotización. Nuestro equipo se
              pondrá en contacto contigo en menos de 24 horas.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/60 mb-2">Cotización estimada:</p>
            <p className="text-2xl font-bold text-gradient">
              {formatCurrency(calculateTotal)}
            </p>
          </div>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              resetForm();
            }}
            className="w-full mt-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white"
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
