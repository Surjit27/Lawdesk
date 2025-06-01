import { LegalDocument, Category } from '../types/lawLibrary';
import { Landmark, Gavel, Scale, ScrollText, FileText, Users, MapPin } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'laws',
    name: 'Legal Laws',
    icon: 'Landmark',
    description: 'Comprehensive collection of constitutional provisions and amendments',
    count: 2500,
  },
  {
    id: 'cases',
    name: 'Previous Cases',
    icon: 'Gavel',
    description: 'Archive of landmark judgments and case analyses',
    count: 5000,
  },
  {
    id: 'orders',
    name: 'Court Orders',
    icon: 'Scale',
    description: 'Collection of important court orders and judgments',
    count: 1200,
  },
  {
    id: 'articles',
    name: 'Top Articles',
    icon: 'ScrollText',
    description: 'Legal articles and commentaries by experts',
    count: 850,
  },
  {
    id: 'documents',
    name: 'Legal Documentation',
    icon: 'FileText',
    description: 'Templates and formats for legal documents',
    count: 3000,
  },
  {
    id: 'lawyers',
    name: 'Lawyer Profiles',
    icon: 'Users',
    description: 'Directory of verified legal professionals across India',
    count: 1500,
  },
  {
    id: 'places',
    name: 'Legal Places',
    icon: 'MapPin',
    description: 'Directory of courts, government offices, and legal institutions',
    count: 800,
  },
];

export const legalDocuments: Record<string, LegalDocument[]> = {
  // ... existing categories ...

  lawyers: [
    {
      id: 'lawyer-1',
      title: 'Rajesh Kumar',
      description: 'Senior Corporate Lawyer with 15+ years of experience',
      content: 'Specializing in corporate law, mergers & acquisitions...',
      date: '2024-03-15',
      category: 'lawyers',
      tags: ['corporate law', 'M&A', 'Mumbai'],
      profileUrl: '/lawyer/rajesh-kumar',
      rating: 4.8,
      experience: '15 years',
      location: 'Mumbai',
      specialization: 'Corporate Law',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    },
    {
      id: 'lawyer-2',
      title: 'Priya Sharma',
      description: 'Civil Rights Attorney and Legal Aid Advocate',
      content: 'Dedicated to protecting civil rights and providing legal assistance...',
      date: '2024-03-14',
      category: 'lawyers',
      tags: ['civil rights', 'legal aid', 'Delhi'],
      profileUrl: '/lawyer/priya-sharma',
      rating: 4.9,
      experience: '12 years',
      location: 'Delhi',
      specialization: 'Civil Rights',
      imageUrl: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400&h=400',
    },
  ],

  places: [
    {
      id: 'place-1',
      title: 'Supreme Court of India',
      description: 'The highest judicial forum and constitutional court',
      content: 'Located in New Delhi, the Supreme Court of India is the highest judicial authority...',
      date: '2024-03-15',
      category: 'places',
      tags: ['supreme court', 'new delhi', 'judicial'],
      address: 'Tilak Marg, New Delhi',
      coordinates: { lat: 28.6229, lng: 77.2378 },
      contactInfo: {
        phone: '+91-11-23388922',
        email: 'contact@sci.gov.in',
      },
    },
    {
      id: 'place-2',
      title: 'Bombay High Court',
      description: 'One of the oldest high courts in India',
      content: 'The Bombay High Court has jurisdiction over Maharashtra, Goa, and Union Territories...',
      date: '2024-03-14',
      category: 'places',
      tags: ['high court', 'mumbai', 'maharashtra'],
      address: 'Fort, Mumbai',
      coordinates: { lat: 18.9322, lng: 72.8313 },
      contactInfo: {
        phone: '+91-22-22616662',
        email: 'contact@bombayhighcourt.gov.in',
      },
    },
  ],
};