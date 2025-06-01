export interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  status: 'open' | 'in_progress' | 'closed';
  clientId: string;
  lawyerId?: string;
  createdAt: string;
  bids: Bid[];
}

export interface Bid {
  id: string;
  caseId: string;
  lawyerId: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  comments?: string[];
  read?: boolean; // Added read status for notifications
}

export interface LawyerProfile {
  id: string;
  name: string;
  type: UserType;
  specialization: string;
  experience: number;
  rating: number;
  casesWon: number;
  totalCases: number;
  available: boolean;
  profileImage: string;
}