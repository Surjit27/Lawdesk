import { create } from 'zustand';
import { LawyerProfile } from '../types/lawyer';

interface LawyerState {
  lawyers: LawyerProfile[];
  getLawyerById: (id: string) => LawyerProfile | undefined;
}

const sampleLawyers: LawyerProfile[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765-43210',
    location: 'Mumbai, India',
    specialization: 'Corporate Law',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    expertise: [
      'Mergers & Acquisitions',
      'Corporate Restructuring',
      'International Business Law',
      'Contract Negotiations'
    ],
    education: [
      {
        degree: 'LLB',
        institution: 'National Law School of India University',
        year: '2010'
      },
      {
        degree: 'Master of Laws (LLM)',
        institution: 'Harvard Law School',
        year: '2012'
      }
    ],
    stats: {
      experience: 12,
      casesWon: 127,
      totalCases: 150,
      rating: 4.8
    }
  },
  // Add more sample lawyers as needed
];

export const useLawyerStore = create<LawyerState>((set, get) => ({
  lawyers: sampleLawyers,
  getLawyerById: (id: string) => get().lawyers.find(lawyer => lawyer.id === id)
}));