export interface LawyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string;
  profileImage: string;
  expertise: string[];
  education: Education[];
  stats: LawyerStats;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface LawyerStats {
  experience: number;
  casesWon: number;
  totalCases: number;
  rating: number;
}