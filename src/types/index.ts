export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: number;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  pricePerPerson?: boolean;
  description: string;
}

export interface EventType {
  id: string;
  name: string;
  basePrice: number;
}

export interface QuoteFormData {
  eventType: string;
  guestCount: number;
  eventDate: string;
  location: string;
  selectedAddons: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  eventType: string;
  content: string;
  image: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  message: string;
}
