import { Case } from '../types/case';

export const filterCases = (cases: Case[], filter: string, userId?: string): Case[] => {
  if (!userId) return [];
  
  return cases.filter((case_) => {
    switch (filter) {
      case 'pending':
        return case_.bids.some(bid => bid.lawyerId === userId && bid.status === 'pending');
      case 'accepted':
        return case_.bids.some(bid => bid.lawyerId === userId && bid.status === 'accepted');
      default:
        return case_.status === 'open' || case_.bids.some(bid => bid.lawyerId === userId);
    }
  });
};