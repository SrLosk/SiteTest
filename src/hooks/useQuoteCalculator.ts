import { useState, useMemo } from 'react';
import type { AddOn, EventType, QuoteFormData } from '@/types';

const eventTypes: EventType[] = [
  { id: 'boda', name: 'Boda', basePrice: 15000 },
  { id: 'quince', name: 'Quinceañera', basePrice: 12000 },
  { id: 'corporativo', name: 'Evento Corporativo', basePrice: 10000 },
  { id: 'infantil', name: 'Fiesta Infantil', basePrice: 5000 },
  { id: 'bautizo', name: 'Bautizo', basePrice: 8000 },
  { id: 'graduacion', name: 'Graduación', basePrice: 9000 },
];

const addOns: AddOn[] = [
  { id: 'floral', name: 'Decoración Floral', price: 3500, description: 'Arreglos florales naturales' },
  { id: 'iluminacion', name: 'Iluminación LED', price: 4500, description: 'Luces LED ambientales' },
  { id: 'sonido', name: 'Sonido Profesional', price: 5000, description: 'Equipo de sonido completo' },
  { id: 'dj', name: 'DJ Profesional', price: 6000, description: 'DJ con equipo incluido' },
  { id: 'catering', name: 'Catering', price: 280, pricePerPerson: true, description: 'Por persona' },
  { id: 'fotografia', name: 'Fotografía', price: 9000, description: 'Cobertura completa' },
  { id: 'video', name: 'Video Profesional', price: 12000, description: 'Video del evento' },
  { id: 'coordinacion', name: 'Coordinación', price: 4000, description: 'Coordinador de evento' },
  { id: 'mobiliario', name: 'Mobiliario Extra', price: 2500, description: 'Mesas y sillas adicionales' },
  { id: 'candybar', name: 'Candy Bar', price: 3500, description: 'Mesa de dulces decorada' },
];

const locationMultipliers: Record<string, number> = {
  salon: 1,
  jardin: 1.15,
  playa: 1.3,
  terraza: 1.1,
  hacienda: 1.2,
};

export function useQuoteCalculator() {
  const [formData, setFormData] = useState<QuoteFormData>({
    eventType: '',
    guestCount: 50,
    eventDate: '',
    location: 'salon',
    selectedAddons: [],
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const calculateTotal = useMemo(() => {
    const eventTypeData = eventTypes.find((e) => e.id === formData.eventType);
    const basePrice = eventTypeData?.basePrice || 0;
    
    const addonsTotal = formData.selectedAddons.reduce((total, addonId) => {
      const addon = addOns.find((a) => a.id === addonId);
      if (!addon) return total;
      
      if (addon.pricePerPerson) {
        return total + addon.price * formData.guestCount;
      }
      return total + addon.price;
    }, 0);

    const locationMultiplier = locationMultipliers[formData.location] || 1;
    
    return Math.round((basePrice + addonsTotal) * locationMultiplier);
  }, [formData]);

  const updateField = <K extends keyof QuoteFormData>(
    field: K,
    value: QuoteFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAddon = (addonId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }));
  };

  const resetForm = () => {
    setFormData({
      eventType: '',
      guestCount: 50,
      eventDate: '',
      location: 'salon',
      selectedAddons: [],
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return {
    formData,
    eventTypes,
    addOns,
    calculateTotal,
    updateField,
    toggleAddon,
    resetForm,
  };
}
