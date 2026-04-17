// Tipos para el sitio de bienes raíces

export interface Development {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  priceRange: string;
  image: string;
  gallery: string[];
  amenities: string[];
  features: Feature[];
  brochureUrl: string;
  legalDocs: LegalDoc[];
  type: 'terrenos' | 'villa' | 'residencial';
  status: 'available' | 'coming_soon' | 'sold_out';
}

export interface Feature {
  icon: string;
  label: string;
  value: string;
}

export interface LegalDoc {
  name: string;
  url: string;
  type: 'pdf';
}

export interface Translation {
  nav: {
    home: string;
    developments: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  developments: {
    title: string;
    subtitle: string;
    viewMore: string;
    downloadBrochure: string;
    amenities: string;
    location: string;
    price: string;
    status: {
      available: string;
      coming_soon: string;
      sold_out: string;
    };
  };
  legal: {
    title: string;
    subtitle: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
    };
    info: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
}

export type Language = 'es' | 'en';
