export interface LegalDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  downloadUrl?: string;
  // Additional fields for lawyers
  profileUrl?: string;
  rating?: number;
  experience?: string;
  location?: string;
  specialization?: string;
  imageUrl?: string;
  // Additional fields for places
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactInfo?: {
    phone: string;
    email: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}