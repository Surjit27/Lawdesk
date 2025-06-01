import { User, UserType } from '../types/auth';

export const dummyUsers: User[] = [
  // Clients
  {
    id: 'client-001',
    name: 'Amit Patel',
    email: 'amit@example.com',
    type: 'client',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'client-002',
    name: 'Priya Singh',
    email: 'priya@example.com',
    type: 'client',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
  },
  
  // Lawyers
  {
    id: 'lawyer-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    type: 'lawyer',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100',
    specialization: 'Corporate Law'
  },
  {
    id: 'lawyer-002',
    name: 'Meera Reddy',
    email: 'meera@example.com',
    type: 'lawyer',
    profileImage: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=100&h=100',
    specialization: 'Civil Rights'
  }
];