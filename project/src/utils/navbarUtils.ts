import { UserType } from '../store/authStore';

export const getBackgroundColor = (isAuthenticated: boolean, isScrolled: boolean, isHomePage: boolean = false): string => {
  if (isAuthenticated && !isHomePage) {
    return 'bg-white border-b border-gray-200';
  }
  return isScrolled ? 'bg-black/95' : 'bg-transparent';
};

export const getTextColor = (isAuthenticated: boolean, isHomePage: boolean = false): string => {
  if (isAuthenticated && !isHomePage) {
    return 'text-gray-800';
  }
  return 'text-white';
};