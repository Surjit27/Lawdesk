export type UserType = 'client' | 'lawyer';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  profileImage?: string;
  specialization?: string; // For lawyers only
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, userType: UserType) => void;
  logout: () => void;
}