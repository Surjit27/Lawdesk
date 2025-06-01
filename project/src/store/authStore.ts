import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserType } from '../types/auth';
import { dummyUsers } from '../data/dummyUsers';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email: string, _password: string, userType: UserType) => {
        // Find matching user from dummy data
        const user = dummyUsers.find(
          (u) => u.email === email && u.type === userType
        );

        if (user) {
          set({
            isAuthenticated: true,
            user,
          });
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);